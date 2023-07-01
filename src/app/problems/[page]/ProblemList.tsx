import { clsx } from "@utils/shared";

import type { DebugProblemBrief } from "./types";

export const ProblemsList = ({ data, page }: { data: DebugProblemBrief[]; page: string }) => {
  return (
    <div className="w-full overflow-hidden rounded-md border-2 border-gray-300">
      <table className="w-full table-auto overflow-hidden">
        <thead>
          <tr className="bg-gray-300 text-lg font-semibold [&>th]:text-ellipsis [&>th]:break-words [&>th]:py-3">
            <th className="text-left"> Problem </th>
            <th className="text-left"> Language </th>
            <th> Score </th>
          </tr>
        </thead>
        <tbody className="h-fit divide-y-2 divide-gray-200">
          {data.map((problem) => (
            <tr
              key={`problem-page-${page}-code-${problem.code}`}
              className={clsx(
                "h-10 text-center even:bg-gray-100",
                "[&>td>div]:break-words] [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis",
              )}
            >
              <td>
                <div className="text-left">{problem.name}</div>
              </td>
              <td>
                <div className="text-left">{problem.language}</div>
              </td>
              <td>
                <div>{problem.best_score}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
