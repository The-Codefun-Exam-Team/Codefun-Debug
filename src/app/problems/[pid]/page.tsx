import { getProblemInfo } from "@utils/api";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { Box, Heading } from "@/components";

import { UserEditor } from "./Editor";
import { InfoTable } from "./InfoTable";
import type { ProblemData } from "./types";

export const metadata: Metadata = {
  title: "Problem",
};

const Page = async ({ params: { pid } }: { params: { pid: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const res = await fetch(`https://debug.codefun.vn/v3/api/problems/${pid}`, {
    method: "GET",
    ...(token && {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(
      "Error fetching data problem page:",
      res.status,
      res.statusText,
      await res.text(),
    );
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Error fetching data</Heading>
          <Heading type="title">Maybe try to reload?</Heading>
        </Box>
      </div>
    );
  }

  const problemData = await getProblemInfo(pid, token?.value);

  const data = (await res.json()).data as ProblemData;
  return (
    <div className="mx-auto flex w-full flex-col items-start gap-6 self-stretch px-3 py-5 md:max-w-7xl md:flex-row md:gap-4 md:px-2 md:py-10 lg:gap-8 lg:px-4">
      <div className="h-auto w-full md:flex-[1_1_0]">
        <InfoTable data={data} pid={pid} />
      </div>
      <div className="flex h-full w-full md:flex-[2_2_0]">
        <UserEditor data={data} pid={pid} />
      </div>
    </div>
  );
};

export default Page;
