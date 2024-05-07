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
        console.log(typeof groupId);
        const offset = (page - 1) * limit;
        const users = await prisma.debugUserStat.findMany({
          select: {
            username: true,
            display_name: true,
            group_name: true,
            user_status: true,
            score: true,
            ratio: true,
            rank: true,
            email: true,
          },
          where: {
            group_id: groupId ? groupId : undefined,
          },
          take: limit,
          skip: offset,
        });

        return users.map((user) => {
          return {
            username: user.username,
            displayName: user.display_name,
            groupName: user.group_name,
            userStatus: user.user_status,
            score: user.score.toFixed(2),
            ratio: user.ratio.toNumber(),
            rank: Number(user.rank),
            avatar: gravatarFromEmail(user.email),
          };
        });
      },
      [`get-users-${groupId}-${page}-${limit}`],
      { revalidate: 10 },
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
