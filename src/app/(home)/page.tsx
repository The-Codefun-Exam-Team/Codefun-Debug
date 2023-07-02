import type { Metadata } from "next";

import type { UserRanking } from "@/shared/types";

import { Announcements } from "./Announcements";
import { Rankings } from "./Rankings";

export const metadata: Metadata = {
  title: "Home",
};

const getTopTenGlobal = async () => {
  const res = await fetch("https://debug.codefun.vn/api/rankings?pageid=1&group=0&limit=10", {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    console.log("Fetch ranking failed in /");
    return null;
  }
  const data = (await res.json()) as UserRanking[];
  return data;
};

const Page = async () => {
  const rankingData = (await getTopTenGlobal())?.slice(0, 10);
  if (!rankingData) {
    return <h1>Fail to fetch data</h1>;
  }
  return (
    <div className="flex w-full flex-col items-start gap-5 self-stretch p-2 md:flex-row md:p-10">
      <div className="h-auto w-full md:flex-[1_1_60px]">
        <Rankings data={rankingData} />
      </div>
      <div className="flex h-full w-full md:flex-[3_3_0]">
        <Announcements />
      </div>
    </div>
  );
};

export default Page;
