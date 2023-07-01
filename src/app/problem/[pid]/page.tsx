import type { Metadata } from "next";
import { cookies } from "next/headers";

import { UserEditor } from "./Editor";
import { InfoTable } from "./InfoTable";
import type { ProblemData } from "./types";

export const metadata: Metadata = {
  title: "Problem",
};

const Page = async ({ params: { pid } }: { params: { pid: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return <h1>Not logged in</h1>;
  }

  const res = await fetch(`https://debug.codefun.vn/api/problems/${pid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    // const body = await res.json();
    // TODO: handle fetch error
    return <h1>An internal server error has occured</h1>;
  }

  const data = (await res.json()) as ProblemData;

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
