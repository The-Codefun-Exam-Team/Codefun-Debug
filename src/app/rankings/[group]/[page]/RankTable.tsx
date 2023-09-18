import { clsx } from "@utils/shared";

import { Heading } from "@/components";

import type { RankingsData } from "./types";

export const RankTable = ({ rankingData, page }: { rankingData: RankingsData; page: string }) => {
  if (rankingData.length === 0) {
    return (
      <div className="h-fit w-full">
        <Heading type="title-large">Noone here!</Heading>
        <Heading type="title">If you belong to this group, be the first to submit!</Heading>
      </div>
    );
  }
  return (
    <div className="w-full">
      <table className="w-full table-auto border-collapse border-spacing-0">
        <thead>
          <tr className="border-b-[1px] border-gray-400 text-lg font-bold dark:border-slate-600 md:text-xl [&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words [&>th]:p-3">
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
          {rankingData.map((user, index) => (
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
