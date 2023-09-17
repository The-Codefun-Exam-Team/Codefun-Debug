import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

import { Box, Heading, Pagination } from "@/components";
import prisma from "@/database/prisma/instance";

import { Group } from "./Group";
import { RankTable } from "./RankTable";
import type { GroupsData, RankingsData } from "./types";

export const metadata: Metadata = {
  title: "Rankings",
};

const getRankings = async (
  group: string,
  page: string,
  limit: string,
): Promise<RankingsData | null> => {
  const bodyData = { group, pageid: page, limit };
  const requestRanking = await fetch(
    // TODO: migrate to api v2
    `https://debug.codefun.vn/api/rankings?${new URLSearchParams(bodyData).toString()}`,
    {
      method: "GET",
    },
  );
  if (!requestRanking.ok) {
    const error = await requestRanking.text();
    console.error(
      "Failed to fetch rankings",
      requestRanking.status,
      requestRanking.statusText,
      error,
    );
    return null;
  }

  return (await requestRanking.json()) ?? [];
};

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
      ["groups"],
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
  const [rankingData, groupsData] = await Promise.all([
    getRankings(group.toString(), page.toString(), "50"),
    getGroups(),
  ]);

  if (!groupsData || !rankingData) {
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Failed to fetch rankings.</Heading>
          <Heading type="title">Maybe try refreshing?</Heading>
        </Box>
      </div>
    );
  }

  return (
    <>
      <div className="relative mx-auto mb-12 flex w-full max-w-5xl flex-col p-4 md:p-10">
        <Group group={group} groupsData={groupsData} />
        <Pagination page={page} baseURL={`/rankings/${group}/`} lastPage="100" />
        <RankTable rankingData={rankingData} page={page} />
        {rankingData.length > 10 && (
          <Pagination page={page} baseURL={`/rankings/${group}/`} lastPage="100" />
        )}
      </div>
    </>
  );
};

export default Page;
