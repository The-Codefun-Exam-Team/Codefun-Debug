import { clsx } from "@utils/shared";
import Link from "next/link";

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
  <div className="w-full overflow-hidden rounded-md border-2 border-gray-300">
    <table className="w-full table-auto overflow-hidden">
      <thead>
        <tr className="bg-gray-300 text-lg font-semibold [&>th>div]:overflow-hidden [&>th>div]:text-ellipsis [&>th>div]:break-words [&>th>div]:p-3">
          <th className="text-left">
            <div>Problem</div>
          </th>

          <th className="text-left">
            <div>Language</div>
          </th>
          {isLoggedIn && (
            <th>
              <div className="text-right">Score</div>
            </th>
          )}
        </tr>
      </thead>
      <tbody className="h-fit divide-y-2 divide-gray-300">
        {data.map((problem) => (
          <tr
            key={`problem-page-${page}-code-${problem.code}`}
            className={clsx(
              "h-10 text-center",
              {
                "even:bg-gray-100": problem.best_score < 100,
                "bg-green-100": problem.best_score == 100,
              },
              "[&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>td>div]:px-3",
            )}
          >
            <td>
              <div className="flex w-fit">
                <Link
                  className="ml-auto h-full text-left font-semibold text-blue-500 hover:font-bold hover:text-blue-600 hover:underline"
                  href={`/problems/${problem.code}`}
                >
                  {problem.name}
                </Link>
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
                  <div className="text-right font-bold text-green-600">Accepted</div>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
