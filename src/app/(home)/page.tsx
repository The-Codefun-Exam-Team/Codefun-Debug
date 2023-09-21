import { clsx } from "@utils/shared";
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
    console.error("Failed to fetch rankings in homepage.");
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
    <div
      className={clsx(
        "flex w-full flex-col items-start divide-y-[1px] divide-gray-400 self-stretch",
        "gap-4 p-8 md:flex-row-reverse md:divide-y-0",
      )}
    >
      <div className="flex h-fit w-full md:h-full md:flex-[4]">
        <Announcements />
      </div>
      <div className="w-full md:h-full md:flex-[3]">
        <Rankings data={rankingData} />
      </div>
    </div>
  );
};

export default Page;
