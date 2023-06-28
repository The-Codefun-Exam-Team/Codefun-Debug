import { clsx } from "@utils/shared";
import Image from "next/image";

import { Heading } from "@/components";

import EmptyPage from "./empty-page.png";
import type { RankingsData } from "./types";

const RANK_TABLE_DIST = [1, 2, 5, 1, 1] as const;

export const RankTable = ({ rankingData, page }: { rankingData: RankingsData; page: string }) => {
  if (rankingData.length === 0) {
    return (
      <div className="h-full w-full">
        <Heading type="title-large">Noone here!</Heading>
        <Heading type="title">If you belong to this group, be the first to submit!</Heading>
        <div className="h-full w-full py-3">
          <div className="relative h-full w-full">
            <Image src={EmptyPage} alt="" fill className="object-fill" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <table className="mt-8 w-full table-fixed border-separate border-spacing-0 rounded-lg border-2">
      <thead>
        <tr
          className={clsx(
            "h-fit bg-gray-300 text-sm font-semibold md:text-lg",
            "[&>th>div]:overflow-hidden [&>th>div]:text-ellipsis [&>th>div]:break-words [&>th>div]:p-3",
          )}
        >
          <th colSpan={RANK_TABLE_DIST[0]}>
            <div>#</div>
          </th>
          <th colSpan={RANK_TABLE_DIST[1]}>
            <div>Username</div>
          </th>
          <th colSpan={RANK_TABLE_DIST[2]}>
            <div>Name</div>
          </th>
          <th colSpan={RANK_TABLE_DIST[3]}>
            <div>Points</div>
          </th>
          <th colSpan={RANK_TABLE_DIST[4]}>
            <div>Rank</div>
          </th>
        </tr>
      </thead>
      <tbody className="h-fit divide-y-2 divide-gray-200">
        {rankingData.map((user, index) => (
          <tr
            key={`ranking-page-${page}-user-${user.id}`}
            className={clsx(
              "group h-10 text-center even:bg-gray-100",
              "[&>td>div]:line-clamp-2 [&>td>div]:text-ellipsis [&>td>div]:break-words",
            )}
          >
            <td colSpan={RANK_TABLE_DIST[0]}>
              <div>{(+page - 1) * 50 + index + 1}</div>
            </td>
            <td colSpan={RANK_TABLE_DIST[1]}>
              <div>{user.username}</div>
            </td>
            <td colSpan={RANK_TABLE_DIST[2]}>
              <div>{user.name}</div>
            </td>
            <td colSpan={RANK_TABLE_DIST[3]}>
              <div>{Math.round(user.points * 100) / 100}</div>
            </td>
            <td colSpan={RANK_TABLE_DIST[4]}>
              <div>{user.rank}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
