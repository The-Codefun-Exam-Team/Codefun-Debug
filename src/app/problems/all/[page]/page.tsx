import type { Metadata } from "next";
import { cookies } from "next/headers";

import { CreateProblem } from "./CreateProblem";
import { Pagination } from "./Pagination";
import { ProblemsList } from "./ProblemList";
import type { DebugProblemBrief } from "./types";

export const metadata: Metadata = {
  title: "Problems",
};

const getProblemsList = async (token: string, page: string, limit: string, language: string) => {
  const bodyData = { page_id: page, limit, language };
  const res = await fetch(
    `https://debug.codefun.vn/v3/api/problems?${new URLSearchParams(bodyData)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    console.log("Error fetching problems list");
    const error = await res.json();
    console.log(error);
    return null;
  }
  console.log(`https://debug.codefun.vn/v3/api/problems?${new URLSearchParams(bodyData)}`);
  return (await res.json()).data as DebugProblemBrief[];
};

const Page = async ({ params: { page } }: { params: { page: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return <h1>Not logged in</h1>;
  }

  const problemsList = await getProblemsList(token.value, page, "50", "");
  if (problemsList === null) {
    return <h1>Error fetching problems list</h1>;
  }

  return (
    <>
      <div className="relative mx-auto mb-12 flex w-full max-w-4xl flex-col p-4 md:p-10">
        <CreateProblem />
        <ProblemsList data={problemsList} page={page} />
      </div>
      <Pagination page={page} />
    </>
  );
};

export default Page;
