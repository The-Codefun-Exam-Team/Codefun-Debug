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

const Page = async ({ params: { sid } }: { params: { sid: number } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return <h1>Not logged in</h1>;
  }

  const requestToDebug = await fetch(`https://debug.codefun.vn/v3/api/submissions/${sid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!requestToDebug.ok) {
    const info = await requestToDebug.text();
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">An error occurred.</Heading>
          <Heading type="title">Detailed error: {info}</Heading>
        </Box>
      </div>
    );
  }

  const submissionData = (await requestToDebug.json()).data as SubmissionsData;
  const requestToCodefun = await fetch(`https://codefun.vn/api/submissions/${submissionData.rid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!requestToCodefun.ok) {
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">An error occurred.</Heading>
        </Box>
      </div>
    );
  }

  const runData = (await requestToCodefun.json()).data as RunData;

  return (
    <div className="mx-auto flex w-full flex-col items-start gap-6 self-stretch px-3 py-5 md:max-w-7xl md:flex-row md:gap-4 md:px-2 md:py-10 lg:gap-8 lg:px-4">
      <div className="h-auto w-full flex-[1_1_0]">
        <InfoTable submissionData={submissionData} runData={runData} sid={sid} />
      </div>
      <div className="flex h-full w-full flex-[2_2_0] flex-col gap-2">
        <RunInfo sid={sid} runData={runData} submissionData={submissionData} />
      </div>
    </div>
  );
};

export default Page;
