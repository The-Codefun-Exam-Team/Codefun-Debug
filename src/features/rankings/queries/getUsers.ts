import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

import type { RankingsData } from "@/features/rankings";
import { gravatarFromEmail } from "@/utils";

export const getUsers = async (
  groupId: number,
  page: number,
  limit: number,
): Promise<RankingsData[]> => {
  try {
    return unstable_cache(
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

        return users.map((user) => {
          return {
            username: user.username,
            displayName: user.displayName,
            groupName: user.groupName,
            userStatus: user.userStatus,
            score: user.score.toFixed(2),
            ratio: user.ratio.toNumber(),
            rank: Number(user.rank),
            avatar: gravatarFromEmail(user.email),
          };
        });
      },
      [`get-users-${groupId}-${page}-${limit}`],
      { revalidate: 20 },
    )();
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
    } else {
      console.error(e);
    }
    throw new Error("Internal Server Error");
  }
};
