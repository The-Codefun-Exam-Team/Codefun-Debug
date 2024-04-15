import type { Metadata } from "next";

import { BriefRankTable } from "@/features/rankings";
import { clsx } from "@/utils";

import { Announcements } from "./Announcements";

export const metadata: Metadata = {
  title: "Home",
};

const Page = async () => {
  void BriefRankTable.preload();
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
        <BriefRankTable />
      </div>
    </div>
  );
};

export default Page;
