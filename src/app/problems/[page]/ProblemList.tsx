import { clsx } from "@utils/shared";

import type { DebugProblemBrief } from "./types";

export const ProblemsList = ({ data, page }: { data: DebugProblemBrief[]; page: string }) => {
  return (
    <div className="w-full overflow-hidden rounded-md border-2 border-gray-300">
      <table className="w-full overflow-hidden">
        <thead>
          <tr className="bg-gray-300 text-lg font-semibold [&>th]:py-3">
            <th> Problem </th>
            <th> Language </th>
            <th> Score </th>
          </tr>
        </thead>
        <tbody className="h-fit divide-y-2 divide-gray-200">
          {data.map((problem) => (
            <tr
              key={`problem-page-${page}-code-${problem.code}`}
              className={clsx(
                "h-10 text-center even:bg-gray-100",
                "[&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words",
              )}
            >
              <td>
                <div>{problem.name}</div>
              </td>
              <td>
                <div>{problem.language}</div>
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
