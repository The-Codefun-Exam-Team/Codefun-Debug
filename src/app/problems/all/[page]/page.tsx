import type { Metadata } from "next";

import { H3, Pagination } from "@/components";
import {
  getProblemCount,
  getProblems,
  ProblemsList,
} from "@/features/problems";

export const metadata: Metadata = {
  title: "Problems",
};

const Page = async ({ params: { page } }: { params: { page: string } }) => {
  const itemsPerPage = 50;
  const pageInt = parseInt(page);
  const [problemCountQuery, problemListQuery] = await Promise.all([
    getProblemCount(),
    getProblems(pageInt, itemsPerPage),
  ]);
  if (!problemCountQuery.ok || !problemListQuery.ok) {
    throw new Error("Cannot fetch problem data.");
  }

  const [problemCount, problemList] = [
    problemCountQuery.data,
    problemListQuery.data,
  ];

  const lastPage = Math.ceil(problemCount / itemsPerPage);

  return (
    <>
      <div className="relative mx-auto flex w-full max-w-4xl flex-col p-4 ">
        <Pagination
          page={pageInt}
          baseURL="/problems/all/"
          lastPage={lastPage}
        />
        <ProblemsList problemList={problemList} page={page} />
        {problemList.length === 0 ? (
          <span className="mt-4">
            <H3>There&apos;s nothing here.</H3>
          </span>
        ) : (
          problemList.length > itemsPerPage / 2 && (
            <Pagination
              page={pageInt}
              baseURL="/problems/all/"
              lastPage={lastPage}
            />
          )
        )}
      </div>
    </>
  );
};

export default Page;
