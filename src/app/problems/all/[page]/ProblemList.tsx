import { clsx } from "@utils/shared";
import { Suspense } from "react";

import { DecoratedLink } from "@/components";

import { CreateProblem } from "./CreateProblem";
import { ProblemScore, ProblemScoreSkeleton } from "./ProblemScore";
import type { ProblemList } from "./types";

export const ProblemsList = ({ problemList, page }: { problemList: ProblemList; page: string }) => (
  <div className="w-full">
    <table className="w-full table-fixed">
      <thead>
        <tr className="border-b-[1px] border-gray-400 text-lg font-bold md:text-xl dark:border-slate-600 [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>th]:p-3">
          <th className="flex gap-2 text-left">
            <div className="hidden sm:block">Problems</div>
            <div className="text-ellipsis sm:hidden ">Probs</div>
            <CreateProblem />
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
      <tbody className="h-fit divide-y-[1px] divide-gray-400 dark:divide-slate-600">
        {problemList.map((problem) => (
          <tr
            key={`problem-page-${page}-code-${problem.code}`}
            className={clsx(
              "h-10 text-center",
              "font-semibold text-slate-600 dark:text-slate-400 [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>td>div]:px-3 [&>td>div]:py-4",
            )}
          >
            <td>
              <div className="flex w-fit">
                <DecoratedLink href={`/problems/${problem.code}`}>{problem.name}</DecoratedLink>
              </div>
            </td>
            <td>
              <div className="text-left">{problem.language}</div>
            </td>
            <td>
              <div className="float-right flex w-fit justify-end">
                <Suspense fallback={<ProblemScoreSkeleton />}>
                  <ProblemScore dpid={problem.dpid} />
                </Suspense>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
