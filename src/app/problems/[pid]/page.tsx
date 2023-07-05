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

  const res = !token
    ? await fetch(`https://debug.codefun.vn/v3/api/problems/${pid}`)
    : await fetch(`https://debug.codefun.vn/v3/api/problems/${pid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        cache: "no-store",
      });

  if (!res.ok) {
    const body = await res.json();
    console.error("Error fetching data problem page:", res.status, res.statusText, body);
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Error fetching data</Heading>
          <Heading type="title">Maybe try to reload?</Heading>
        </Box>
      </div>
    );
  }

  const data = (await res.json()).data as ProblemData;
  return (
    <div className="flex w-full flex-col items-start gap-5 self-stretch p-2 md:flex-row md:p-10">
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
