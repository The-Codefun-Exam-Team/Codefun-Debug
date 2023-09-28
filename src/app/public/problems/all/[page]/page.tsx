import { getAllProblem } from "@utils/api";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { ProblemsList } from "@/app/problems/all/[page]/ProblemList";
import { Box, Heading, Pagination } from "@/components";

export const metadata: Metadata = {
  title: "Problems",
};

const Page = async ({ params: { page } }: { params: { page: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const problemsList = await getAllProblem(token?.value, page, "50");

  if (!problemsList.ok) {
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Failed to fetch problems.</Heading>
          <Heading type="title">Maybe try refreshing?</Heading>
        </Box>
      </div>
    );
  }
  if (problemsList.user) {
    return (
      <div className="flex h-full w-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Internal server error occured.</Heading>
          <Heading type="title">Maybe try refreshing</Heading>
        </Box>
      </div>
    );
  }

  return (
    <>
      <div className="relative mx-auto flex w-full max-w-4xl flex-col p-4 ">
        <Pagination page={page} baseURL="/problems/all/" lastPage="100" />
        <ProblemsList
          data={{ user: problemsList.user, problemList: problemsList.data }}
          page={page}
        />
        {problemsList.data.length > 0 && (
          <Pagination page={page} baseURL="/problems/all/" lastPage="100" />
        )}
      </div>
    </>
  );
};

export default Page;
