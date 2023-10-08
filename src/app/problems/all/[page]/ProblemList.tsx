import { clsx } from "@utils/shared";

import { DecoratedLink, Score } from "@/components";

import { CreateProblem } from "./CreateProblem";
import type { ProblemList, ProblemListWithScore } from "./types";

export const ProblemsList = ({
  data,
  page,
}: {
  data:
    | { user: true; problemList: ProblemListWithScore }
    | { user: false; problemList: ProblemList };
  page: string;
}) => (
  <div className="w-full">
    <table className="w-full table-auto">
      <thead>
        <tr className="border-b-[1px] border-gray-400 text-lg font-bold dark:border-slate-600 md:text-xl [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>th]:p-3">
          <th className="flex gap-2 text-left">
            <div className="hidden sm:block">Problems</div>
            <div className="text-ellipsis sm:hidden ">Probs</div>
            <CreateProblem />
          </th>
          <th className="text-left">
            <div className="hidden sm:block">Language</div>
            <div className="text-ellipsis sm:hidden">Lang</div>
          </th>
          {data.user && (
            <th>
              <div className="text-right">Score</div>
            </th>
          )}
        </tr>
      </thead>
      <tbody className="h-fit divide-y-[1px] divide-gray-400 dark:divide-slate-600">
        {data.user
          ? data.problemList.map((problem) => {
              return (
                <tr
                  key={`problem-page-${page}-code-${problem.code}`}
                  className={clsx(
                    "h-10 text-center",
                    "font-semibold text-slate-600 dark:text-slate-400 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>td>div]:px-3 [&>td>div]:py-4",
                  )}
                >
                  <td>
                    <div className="flex w-fit">
                      <DecoratedLink href={`/problems/${problem.code}`}>
                        {problem.name}
                      </DecoratedLink>
                    </div>
                  </td>
                  <td>
                    <div className="text-left">{problem.language}</div>
                  </td>
                  <td>
                    <div className="float-right flex w-fit justify-end">
                      <Score {...problem} className="text-right" />
                    </div>
                  </td>
                </tr>
              );
            })
          : data.problemList.map((problem) => {
              return (
                <tr
                  key={`problem-page-${page}-code-${problem.code}`}
                  className={clsx(
                    "h-10 text-center",
                    "font-semibold text-slate-600 dark:text-slate-400 [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>td>div]:px-3 [&>td>div]:py-4",
                  )}
                >
                  <td>
                    <div className="flex w-fit">
                      <DecoratedLink href={`/problems/${problem.code}`}>
                        {problem.name}
                      </DecoratedLink>
                    </div>
                  </td>
                  <td>
                    <div className="text-left">{problem.language}</div>
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  </div>
);
