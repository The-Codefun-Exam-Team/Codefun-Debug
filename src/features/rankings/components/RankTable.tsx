import { cache } from "react";

import { H2, H3 } from "@/components";
import { getUsers } from "@/features/rankings";
import { clsx } from "@/utils";

const getRankTableData = cache((groupId: number, page: number) => {
  return getUsers(groupId, page, 50);
});

export const RankTable = async ({
  group,
  page,
}: {
  group: number;
  page: number;
}) => {
  const data = await getRankTableData(group, page);
  if (data.length === 0) {
    return (
      <div className="h-fit w-full">
        <H2>No one here!</H2>
        <H3>
          Please submit first if you haven&#39;t seen your name on the leader
          board.
        </H3>
      </div>
    );
  }
  return (
    <div className="w-full">
      <table className="w-full table-auto border-collapse border-spacing-0">
        <thead>
          <tr className="border-b border-gray-400 text-lg font-bold dark:border-slate-600 md:text-xl [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>th]:p-3">
            <th>
              <div className="text-left">#</div>
            </th>
            <th>
              <div className="text-left">Name</div>
            </th>
            <th>
              <div className="text-right">Points</div>
            </th>
            <th>
              <div className="text-right">Rank</div>
            </th>
          </tr>
        </thead>
        <tbody className="h-fit divide-y divide-gray-400 dark:divide-slate-600">
          {data.map((user, index) => (
            <tr
              key={`ranking-page-${page}-user-${user.username}`}
              className={clsx(
                "h-10 text-center",
                "font-semibold text-slate-600 dark:text-slate-400 [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>td>div]:px-3 [&>td>div]:py-4",
              )}
            >
              <td>
                <div className="text-left">{(+page - 1) * 50 + index + 1}</div>
              </td>
              <td>
                <div className="break-all text-left">{user.displayName}</div>
              </td>
              <td>
                <div className="text-right">{user.score}</div>
              </td>
              <td>
                <div className="text-right">{user.rank}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RankTable.preload = getRankTableData;
