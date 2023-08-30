import { clsx } from "@utils/shared";

import { DecoratedLink } from "@/components";

import { CreateProblem } from "./CreateProblem";
import type { DebugProblemBrief } from "./types";

export const ProblemsList = ({
  isLoggedIn,
  data,
  page,
}: {
  isLoggedIn: boolean;
  data: DebugProblemBrief[];
  page: string;
}) => (
  <div className="w-full overflow-scroll rounded-md">
    <table className="w-full table-auto">
      <thead>
        <tr className="border-b-[1px] border-gray-400 text-lg font-bold dark:border-slate-600 md:text-xl [&>th>div]:p-3">
          <th className="text-left">
            <div className="flex gap-2">
              <div className="hidden sm:block">Problems</div>
              <div className="text-ellipsis sm:hidden ">Probs</div>
              <CreateProblem />
            </div>
          </th>
          <th className="text-left">
            <div className="hidden sm:block">Language</div>
            <div className="text-ellipsis sm:hidden">Lang</div>
          </th>
          {isLoggedIn && (
            <th>
              <div className="break-all text-right sm:break-words">Score</div>
            </th>
          )}
        </tr>
      </thead>
      <tbody className="h-fit divide-y-[1px] divide-gray-400 dark:divide-slate-600">
        {data.map((problem) => (
          <tr
            key={`problem-page-${page}-code-${problem.code}`}
            className={clsx(
              "h-10 text-center",
              // "even:bg-gray-100",
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
            {isLoggedIn && (
              <td>
                {problem.best_score < 100 ? (
                  <div className="text-right">
                    {problem.best_score === -1 ? "Not yet scored" : problem.best_score.toFixed(2)}
                  </div>
                ) : (
                  <div className="text-right font-bold text-green-600 dark:text-green-500">
                    Accepted
                  </div>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
