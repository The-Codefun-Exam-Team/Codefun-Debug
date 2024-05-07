import prisma from "@database/prisma/instance";
import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

import type { RankingsData } from "@/features/rankings";
import { gravatarFromEmail } from "@/utils";

export const getUsers = async (
  group: string,
  page: string,
  limit: string,
): Promise<RankingsData[]> => {
  try {
    return unstable_cache(
      async () => {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        interface queryData {
          username: string;
          display_name: string;
          group_name: string;
          user_status: string;
          score: Decimal;
          ratio: number;
          rank: number;
          email: string;
        }
        const users = await prisma.$queryRaw<queryData[]>`
        SELECT 
          u.username,
          u.display_name,
          g.name AS group_name,
          u.user_status,
          dur.score,
          ur.ratio,
          dur.rank,
          u.email
        FROM 
          debug_user_rankings dur
          JOIN users u ON dur.user_id = u.id
          JOIN user_rankings ur ON dur.user_id = ur.id
          JOIN groups g ON u.group_id = g.id
        WHERE 
          CASE WHEN ${group}::numeric <> 0 THEN g.id = ${group}::numeric ELSE TRUE END
        ORDER BY dur.rank ASC
        LIMIT ${limit}::numeric OFFSET ${offset}::numeric;
      `;

        return users.map((user) => {
          return {
            username: user.username,
            display_name: user.display_name,
            group_name: user.group_name,
            user_status: user.user_status,
            score: new Decimal(user.score),
            ratio: user.ratio,
            rank: Number(user.rank),
            avatar: gravatarFromEmail(user.email),
          };
        });
      },
      [`get-users-${group}-${page}-${limit}`],
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
