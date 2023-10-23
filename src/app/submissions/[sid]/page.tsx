import { getSubmissionInfo } from "@utils/api";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { Box, Heading } from "@/components";

import { InfoTable } from "./InfoTable";
import { RunInfo } from "./RunInfo";
import type { RunData, SubmissionsData } from "./types";

// export const generateStaticParams = () => [];

export const metadata: Metadata = {
  title: "Submissions",
};

const Page = async ({ params: { sid } }: { params: { sid: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const data = await getSubmissionInfo(sid, token?.value);

  return (
    <div className="mx-auto flex w-full flex-col items-start gap-6 self-stretch px-3 py-5 md:max-w-7xl md:flex-row md:gap-4 md:px-2 md:py-10 lg:gap-8 lg:px-4">
      <div className="h-auto w-full flex-[1_1_0]">
        {/* <InfoTable submissionData={submissionData} runData={runData} sid={sid} /> */}
      </div>
      <div className="flex h-full w-full flex-[2_2_0] flex-col gap-2">
        {/* <RunInfo sid={sid} runData={runData} submissionData={submissionData} /> */}
      </div>
    </div>
  );
};

export default Page;
