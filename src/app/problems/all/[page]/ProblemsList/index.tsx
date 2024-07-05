import { Suspense } from "react";

import { DecoratedLink } from "@/components";
import type { ProblemList } from "@/features/problems";
import { clsx } from "@/utils";

import { CreateProblemButton } from "./CreateProblemButton";
import { ProblemScore, ProblemScoreSkeleton } from "./ProblemScore";

export const ProblemsList = ({
  problemList,
  page,
}: {
  problemList: ProblemList;
  page: string;
}) => (
  <div className="w-full">
    <table className="w-full table-fixed">
      <thead>
        <tr className="border-b border-gray-400 text-lg font-bold dark:border-slate-600 md:text-xl [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>th]:p-3">
          <th className="flex gap-2 text-left">
            <div className="hidden sm:block">Problems</div>
            <div className="text-ellipsis sm:hidden ">Probs</div>
            <CreateProblemButton />
          </th>
          <th className="text-left">
            <div className="hidden sm:block">Language</div>
            <div className="text-ellipsis sm:hidden">Lang</div>
          </th>
          <th>
            <div className="text-right">Score</div>
          </th>
        </tr>
      </thead>
      <tbody className="h-fit divide-y divide-gray-400 dark:divide-slate-600">
        {problemList.map((problem) => (
          <tr
            key={`problem-page-${page}-code-${problem.id}`}
            className={clsx(
              "h-10 text-center",
              "font-semibold text-slate-600 dark:text-slate-400 [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>td>div]:px-3 [&>td>div]:py-4",
            )}
          >
            <td>
              <div className="flex w-fit">
                <DecoratedLink href={`/problems/${problem.debugProblemCode}`}>
                  {problem.name}
                </DecoratedLink>
              </div>
            </td>
            <td>
              <div className="text-left">{problem.language}</div>
            </td>
            <td>
              <div className="float-right flex w-fit justify-end">
                <Suspense fallback={<ProblemScoreSkeleton />}>
                  <ProblemScore id={problem.id} />
                </Suspense>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
