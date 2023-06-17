import type { Metadata } from "next";
import { cookies } from "next/headers";

import type { UserData } from "@/shared/types";

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
  const rankingData = (await requestRanking.json()) as Array<UserData>;
  return rankingData;
}

async function getGroups() {
  const requestGroups = await fetch("https://codefun.vn/api/groups", {
    method: "GET",
  });
  const groupsData = (await requestGroups.json()) as Array<string>;
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
  const rankingRequest = getRankings(group, page, "50", token.value);
  const groupsRequest = getGroups();

  const [rankingData, groupsData] = await Promise.all([rankingRequest, groupsRequest]);

  console.log(groupsData);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col p-4 md:p-10">
      <div className="h-10 w-full bg-red-500"></div>
    </div>
  );
};

export default Page;
