import { getAllProblem, getProblemCount } from "@utils/api";
import type { Metadata } from "next";

import { Box, Heading, Pagination } from "@/components";

import { ProblemsList } from "./ProblemList";

export const metadata: Metadata = {
  title: "Problems",
};

const Page = async ({ params: { page } }: { params: { page: string } }) => {
  const [problemCount, problemsList] = await Promise.all([
    getProblemCount(),
    getAllProblem(page, "50"),
  ]);

  if (!problemsList.ok || !problemCount.ok) {
    if (!problemsList.ok) {
      console.error(problemsList.status, problemsList.error);
    }
    if (!problemCount.ok) {
      console.error(problemCount.status, problemCount.error);
    }
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Failed to fetch problems.</Heading>
          <Heading type="title">Maybe try refreshing?</Heading>
        </Box>
      </div>
    );
  }

  const lastPage = Math.ceil(problemCount.count / 50).toString();

  return (
    <>
      <div className="relative mx-auto flex w-full max-w-4xl flex-col p-4 ">
        <Pagination page={page} baseURL="/problems/all/" lastPage={lastPage} />
        <ProblemsList problemList={problemsList.data} page={page} />
        {problemsList.data.length === 0 ? (
          <span className="mt-4">
            <Heading>There&apos;s nothing here.</Heading>
          </span>
        ) : (
          <Pagination page={page} baseURL="/problems/all/" lastPage={lastPage} />
        )}
      </div>
    </>
  );
};

export default Page;
