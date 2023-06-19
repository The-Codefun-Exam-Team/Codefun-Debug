import type { Metadata } from "next";
import { cookies } from "next/headers";

import { Group } from "./Group";
import { Pagination } from "./Pagination";
import { RankTable } from "./RankTable";
import type { GroupsData, RankingsData } from "./types";

export const metadata: Metadata = {
  title: "Rankings",
};

async function getRankings(group: string, page: string, limit: string, token: string) {
  const bodyData = { group: group, pageid: page, limit: limit } as Record<string, string>;
  const requestRanking = await fetch(
    `https://debug.codefun.vn/api/rankings?${new URLSearchParams(bodyData).toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!requestRanking.ok) {
    const error = await requestRanking.json();
    console.log("Error fetching rankings", requestRanking.status, requestRanking.statusText, error);
    return null;
  }
  const rankingData = (await requestRanking.json()) as RankingsData;
  if (rankingData === null) {
    return [];
  }
  return rankingData;
}

async function getGroups() {
  const requestGroups = await fetch("https://codefun.vn/api/groups", {
    method: "GET",
  });
  if (!requestGroups.ok) {
    const error = await requestGroups.json();
    console.log("Error fetching groups", requestGroups.status, requestGroups.statusText, error);
    return null;
  }
  const groupsData = (await requestGroups.json()).data as GroupsData;
  return groupsData;
}

const Page = async ({ params: { group, page } }: { params: { group: string; page: string } }) => {
  // get token from cookie
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token === undefined) {
    return <div>Token not found</div>;
  }

  // fetch data
  const rankingRequest = getRankings(group.toString(), page.toString(), "50", token.value);
  const groupsRequest = getGroups();

  const [rankingData, groupsData] = await Promise.all([rankingRequest, groupsRequest]);

  if (rankingData === null || groupsData === null) {
    return <div>Cannot fetch data</div>;
  }

  return (
    <>
      <div className="relative mx-auto mb-12 flex w-full max-w-5xl flex-col p-4 md:p-10">
        <Group group={group} groupsData={groupsData}></Group>
        <RankTable rankingData={rankingData} page={page}></RankTable>
      </div>
      <Pagination group={group} page={page}></Pagination>
    </>
  );
};

export default Page;
