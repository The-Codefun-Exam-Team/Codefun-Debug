import prisma from "@database/prisma/instance";
import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

import { Pagination } from "@/components";
import { Groups, RankTable } from "@/features/rankings";

export const metadata: Metadata = {
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
    throw "Internal Server Error";
  }
};

const Page = async ({ params: { group, page } }: { params: { group: string; page: string } }) => {
  // Preload data
  Promise.all([RankTable.preload(group, page), Groups.preload()]);

  const userCount = await getUserCount(group);

  const lastPage = userCount ? Math.ceil(userCount / 50) : 1;

  return (
    <>
      <div className="relative mx-auto mb-12 flex w-full max-w-5xl flex-col p-4 md:p-10">
        <Groups group={group} />
        <Pagination page={page} baseURL={`/rankings/${group}/`} lastPage={lastPage.toString()} />
        <RankTable group={group} page={page} />
        {userCount - (parseInt(page) - 1) * 50 > 10 && (
          <Pagination page={page} baseURL={`/rankings/${group}/`} lastPage={lastPage.toString()} />
        )}
      </div>
    </>
  );
};

export default Page;
