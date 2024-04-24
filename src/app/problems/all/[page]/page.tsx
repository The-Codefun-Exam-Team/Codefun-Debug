import type { Metadata } from "next";

import { Box, Heading, Pagination } from "@/components";
import { getAllProblem, getProblemCount, ProblemsList } from "@/features/problems";

export const metadata: Metadata = {
  title: "Problems",
};

const Page = async ({ params: { page } }: { params: { page: string } }) => {
  const itemsPerPage = 50;
  const [problemCount, problemsList] = await Promise.all([
    getProblemCount(),
    getAllProblem(page, itemsPerPage.toString()),
  ]);

  if (!problemsList.ok || !problemCount.ok) {
    if (!problemsList.ok) {
      console.error(problemsList.status, problemsList.error);
    }
    if (!problemCount.ok) {
      console.error(problemCount.status, problemCount.error);
    }
    return (
      <div className="flex size-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Failed to fetch problems.</Heading>
          <Heading type="title">Maybe try refreshing?</Heading>
        </Box>
      </div>
    );
  }

  const lastPage = Math.ceil(problemCount.count / itemsPerPage).toString();

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
          problemsList.data.length > itemsPerPage / 2 && (
            <Pagination page={page} baseURL="/problems/all/" lastPage={lastPage} />
          )
        )}
      </div>
    </>
  );
};

export default Page;
