import { getUsers } from "@utils/api";
import { clsx } from "@utils/shared";
import type { Metadata } from "next";

import { Box, Heading } from "@/components";

import { Announcements } from "./Announcements";
import { Rankings } from "./Rankings";

const metadata: Metadata = {
  title: "Home",
};

const Page = async () => {
  const rankingData = await getUsers("0", "1", "10");
  if (!rankingData.ok) {
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
        <Rankings data={rankingData.data} />
      </div>
    </div>
  );
};

export { metadata };
export default Page;
