import type { Metadata } from "next";

import { Box, Heading } from "@/components";
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
    console.log("Failed to fetch rankings in homepage.");
    return null;
  }
  const data = (await res.json()) as UserRanking[];
  return data;
};

const Page = async () => {
  const rankingData = (await getTopTenGlobal())?.slice(0, 10);
  if (!rankingData) {
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Failed to fetch homepage.</Heading>
          <Heading type="title">Maybe try refreshing?</Heading>
        </Box>
      </div>
    );
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
