import prisma from "@database/prisma/instance";
import { unstable_cache, unstable_noStore } from "next/cache";

import type { RankingsData } from "@/features/rankings";
import type { FunctionReturnType, UserDisplayInfo } from "@/types";
import { gravatarFromEmail, handleCatch } from "@/utils";

export const getUsers = async (
  groupId: number,
  page: number,
  limit: number,
): Promise<FunctionReturnType<RankingsData>> => {
  unstable_noStore();
  try {
    return await unstable_cache(
      async () => {
        const offset = (page - 1) * limit;
        const users = await prisma.debugUserStat.findMany({
          select: {
            username: true,
            displayName: true,
            groupName: true,
            userStatus: true,
            score: true,
            ratio: true,
            rank: true,
            email: true,
          },
          where: {
            groupId: groupId ? groupId : undefined,
          },
          orderBy: {
            score: "desc",
          },
          take: limit,
          skip: offset,
        });

        const data = users.map((user) => {
          if (user.userStatus === "banned") {
            return {
              username: user.username,
              displayName: user.displayName,
              groupName: user.groupName,
              status: "banned",
              avatar: gravatarFromEmail(user.email),
              ratio: null,
              score: null,
              rank: null,
            } satisfies UserDisplayInfo;
          }
          if (
            user.score === null ||
            user.ratio === null ||
            user.rank === null
          ) {
            throw new Error("Internal Server Error");
          }
          return {
            username: user.username,
            displayName: user.displayName,
            groupName: user.groupName,
            status: user.userStatus,
            score: user.score?.toFixed(2) ?? null,
            ratio: user.ratio?.toNumber() ?? null,
            rank: Number(user.rank),
            avatar: gravatarFromEmail(user.email),
          } satisfies UserDisplayInfo;
        });
        return {
          ok: true,
          data: data,
        } satisfies { ok: true; data: RankingsData };
      },
      [`get-users-${groupId}-${page}-${limit}`],
      { revalidate: 20 },
    )();
  } catch (e) {
    return handleCatch(e);
  }
};
