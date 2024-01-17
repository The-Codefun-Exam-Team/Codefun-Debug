import { getProblemInfo } from "@utils/api";
import type { Metadata } from "next";
import { Suspense } from "react";

import { Box, Heading } from "@/components";

import { Editor } from "./Editor";
import { InfoTable } from "./InfoTable";
import { InfoTableScore } from "./InfoTableScore";

export const metadata: Metadata = {
  title: "Problem",
};

const Page = async ({ params: { pid } }: { params: { pid: string } }) => {
  const problemData = await getProblemInfo(pid);

  if (!problemData.ok) {
    console.error(problemData.status, problemData.error);
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Failed to fetch data.</Heading>
          <Heading type="title">Maybe try reloading?</Heading>
        </Box>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col items-start gap-6 self-stretch px-3 py-5 md:max-w-7xl md:flex-row md:gap-4 md:px-2 md:py-10 lg:gap-8 lg:px-4">
      <div className="h-auto w-full md:flex-[1_1_0]">
        <InfoTable
          score={
            <Suspense
              fallback={
                <div className="pb-4 pt-5">
                  <div className="mx-auto h-8 w-28 animate-pulse rounded-md bg-gray-200 dark:bg-slate-600"></div>
                </div>
              }
            >
              <InfoTableScore problemId={pid} />
            </Suspense>
          }
          problemData={problemData.data}
          pid={pid}
        />
      </div>
      <div className="flex h-full w-full md:flex-[2_2_0]">
        <Suspense fallback={<div className="pb-4 pt-5 text-center text-2xl">Loading...</div>}>
          <Editor problemData={problemData.data} pid={pid} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
