import { clsx } from "@utils/shared";
import { cache } from "react";

import { Heading } from "@/components";

import { getUsers } from "../query/getUsers";

const getRankTableData = cache((group: string, page: string) => {
  return getUsers(group, page, "50");
});

const RankTable = async ({ group, page }: { group: string; page: string }) => {
  const data = await getRankTableData(group, page);
  if (data.length === 0) {
    return (
      <div className="h-fit w-full">
        <Heading type="title-large">Noone here!</Heading>
        <Heading type="title">
          Please submit first if you haven&#39;t seen your name on the leaderboard.
        </Heading>
      </div>
    );
  }
  return (
    <div className="w-full">
      <table className="w-full table-auto border-collapse border-spacing-0">
        <thead>
          <tr className="border-b-[1px] border-gray-400 text-lg font-bold md:text-xl dark:border-slate-600 [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>th]:p-3">
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
        <tbody className="h-fit divide-y-[1px] divide-gray-400 dark:divide-slate-600">
          {data.map((user, index) => (
            <tr
              key={`ranking-page-${page}-user-${user.id}`}
              className={clsx(
                "h-10 text-center",
                "font-semibold text-slate-600 dark:text-slate-400 [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>td>div]:px-3 [&>td>div]:py-4",
              )}
            >
              <td>
                <div className="text-left">{(+page - 1) * 50 + index + 1}</div>
              </td>
              <td>
                <div className="break-all text-left">{user.name}</div>
              </td>
              <td>
                <div className="text-right">{user.score.toFixed(2)}</div>
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

export { RankTable };
