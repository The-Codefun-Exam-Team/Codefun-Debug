import { clsx } from "@utils/shared";
import Image from "next/image";

import { Heading } from "@/components";

import EmptyPage from "./empty-page.png";
import type { RankingsData } from "./types";

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
    <div className="mt-8 w-full overflow-x-auto rounded-md border-2 border-gray-300">
      <table className="w-full table-auto border-collapse border-spacing-0">
        <thead
          className={clsx(
            "[&>*>:nth-child(1)]:w-[10%] [&>*>:nth-child(2)]:w-[10%] [&>*>:nth-child(3)]:w-[50%]",
            "[&>*>:nth-child(4)]:w-[10%] [&>*>:nth-child(5)]:w-[10%]",
          )}
        >
          <tr
            className={clsx(
              "h-fit bg-gray-300 text-sm font-semibold md:text-lg",
              "[&>th>div]:overflow-hidden [&>th>div]:text-ellipsis [&>th>div]:break-words [&>th>div]:p-3",
            )}
          >
            <th>
              <div>#</div>
            </th>
            <th>
              <div>Username</div>
            </th>
            <th>
              <div>Name</div>
            </th>
            <th>
              <div>Points</div>
            </th>
            <th>
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
              <td>
                <div>{(+page - 1) * 50 + index + 1}</div>
              </td>
              <td>
                <div>{user.username}</div>
              </td>
              <td>
                <div>{user.name}</div>
              </td>
              <td>
                <div>{Math.round(user.points * 100) / 100}</div>
              </td>
              <td>
                <div>{user.rank}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
