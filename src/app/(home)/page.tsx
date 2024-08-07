import type { Metadata } from "next";
import { Suspense } from "react";

import { clsx } from "@/utils";

import { Announcements } from "./Announcements";
import { BriefRankTable, BriefRankTableSkeleton } from "./BriefRankTable";

export const metadata: Metadata = {
  title: "Home",
};

const Page = () => (
  <div
    className={clsx(
      "flex w-full flex-col items-start self-stretch",
      "gap-8 p-8 md:flex-row-reverse md:divide-y-0",
    )}
  >
    <div className="flex h-fit w-full md:h-full md:flex-[4]">
      <Announcements />
    </div>
    <div className="w-full md:h-full md:flex-[3]">
      {/* TODO: Resolve layout shifting */}
      <Suspense fallback={<BriefRankTableSkeleton />}>
        <BriefRankTable />
      </Suspense>
    </div>
  </div>
);

export default Page;
