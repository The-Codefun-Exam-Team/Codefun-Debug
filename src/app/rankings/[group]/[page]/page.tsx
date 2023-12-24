import prisma from "@database/prisma/instance";
import { Prisma } from "@prisma/client";
import { getUsers } from "@utils/api";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

import { Box, Heading, Pagination } from "@/components";

import { Group } from "./Group";
import { RankTable } from "./RankTable";
import type { GroupsData } from "./types";

const metadata: Metadata = {
  title: "Rankings",
};

export const generateStaticParams = async () => {
  const groupCounts = (await prisma.$queryRaw`
    WITH user_table AS (SELECT tid FROM debug_submissions GROUP BY tid)
    SELECT count(user_table.tid) as count, groups.gid
    FROM user_table 
    INNER JOIN teams ON user_table.tid = teams.tid
    INNER JOIN groups ON teams.group = groups.gid
    GROUP BY groups.gid
  `) as { count: number; gid: number }[];

  const globalCount = await prisma.debugSubmissions.findMany({
    distinct: ["tid"],
    select: {
      tid: true,
    },
  });

  groupCounts.push({ count: globalCount.length, gid: 0 });

  const params = groupCounts.flatMap(({ count, gid }) => {
    const page = Math.ceil((Number(count) + 1) / 50);
    return Array.from({ length: page }, (_, i) => ({
      group: gid.toString(),
      page: (i + 1).toString(),
    }));
  });
  return params;
};

export const revalidate = 30;

const getGroups = async (): Promise<GroupsData | null> => {
  try {
    return unstable_cache(
      async () => {
        const groups = prisma.groups.findMany();
        const data = await groups;
        data.push({ gid: 0, groupname: "Global" });
        data.reverse();
        return groups;
      },
      ["getGroups"],
      { revalidate: 30 },
    )();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    return null;
  }
};

const getUserCount = async (group: string) => {
  const globalCount = prisma.$queryRaw`
    WITH user_table AS ( SELECT tid FROM debug_submissions GROUP BY tid )
    SELECT count(user_table.tid) as count
    FROM user_table INNER JOIN teams ON user_table.tid = teams.tid
  `;

  const groupCount = prisma.$queryRaw`
    WITH user_table AS ( SELECT tid FROM debug_submissions GROUP BY tid )
    SELECT count(user_table.tid) as count
    FROM user_table INNER JOIN teams ON user_table.tid = teams.tid
    WHERE teams.group = ${group}
  `;

  try {
    return unstable_cache(
      async () => {
        const count = (parseInt(group) > 0 ? await groupCount : await globalCount) as {
          count: number;
        }[];
        return Number(count[0].count);
      },
      [`getUserCount-${group}`],
      { revalidate: 30 },
    )();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    return null;
  }
};

const Page = async ({ params: { group, page } }: { params: { group: string; page: string } }) => {
  const [rankingData, groupsData, userCount] = await Promise.all([
    getUsers(group.toString(), page.toString(), "50"),
    getGroups(),
    getUserCount(group),
  ]);

  if (!groupsData || !rankingData.ok || userCount === null) {
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Failed to fetch rankings.</Heading>
          <Heading type="title">Maybe try refreshing?</Heading>
        </Box>
      </div>
    );
  }

  const lastPage = userCount ? Math.ceil(userCount / 50) : 1;

  return (
    <>
      <div className="relative mx-auto mb-12 flex w-full max-w-5xl flex-col p-4 md:p-10">
        <Group group={group} groupsData={groupsData} />
        <Pagination page={page} baseURL={`/rankings/${group}/`} lastPage={lastPage.toString()} />
        <RankTable rankingData={rankingData.data} page={page} />
        {rankingData.data.length > 10 && (
          <Pagination page={page} baseURL={`/rankings/${group}/`} lastPage={lastPage.toString()} />
        )}
      </div>
    </>
  );
};

export { metadata };
export default Page;
