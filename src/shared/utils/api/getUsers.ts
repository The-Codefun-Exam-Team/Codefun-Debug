import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { gravatarFromEmail } from "@utils/shared";
import { unstable_cache } from "next/cache";

import type { RankingsData, UserRanking } from "@/app/rankings/[group]/[page]/types";
import prisma from "@/database/prisma/instance";

export const getUsers = async (
  group: string,
  page: string,
  limit: string,
): Promise<{ ok: true; data: RankingsData } | { ok: false; error: string; status: string }> => {
  // calculate offset
  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Raw SQL to query score and ranking (prisma not supporting nested group by yet)
  const rankTableQuery = prisma.$queryRaw`
    WITH score_table AS (SELECT tid, dpid, MAX(score) as max_score FROM debug_submissions GROUP BY tid, dpid)
    SELECT teams.tid, RANK() OVER (ORDER BY SUM(score_table.max_score) DESC) AS rank, SUM(score_table.max_score) as score 
    FROM score_table 
    INNER JOIN teams ON teams.tid = score_table.tid
    WHERE (CASE WHEN ${parseInt(group)} = 0 THEN 1=1 ELSE teams.group = ${parseInt(group)} END)
    GROUP BY tid
    ORDER BY score DESC
    LIMIT ${parseInt(limit)} OFFSET ${offset}
  `;

  // required users infos
  const requiredFields = Prisma.validator<Prisma.TeamsSelect>()({
    tid: true,
    name: true,
    teamname: true,
    status: true,
    group: true,
    email: true,
    solved: true,
  });

  try {
    const data = unstable_cache(
      async () => {
        const rank_table = (await rankTableQuery) as { tid: number; rank: number; score: number }[];
        rank_table.sort((a, b) => a.tid - b.tid);
        const usersInfo = await prisma.teams.findMany({
          where: {
            tid: {
              in: rank_table.map((user) => user.tid),
            },
          },
          select: requiredFields,
        });
        const problemsCount = await prisma.problems.count();

        const users = usersInfo.map((user, index) => {
          return {
            id: user.tid,
            username: user.teamname,
            name: user.name,
            group: {
              id: user.group.gid,
              name: user.group.groupname,
            },
            status: user.status,
            score: rank_table[index].score,
            ratio: user.solved / problemsCount,
            avatar: gravatarFromEmail(user.email),
            rank: Number(rank_table[index].rank),
          } satisfies UserRanking;
        });
        return users.sort((a, b) => a.rank - b.rank);
      },
      [`getUsers-${group}-${page}-${limit}`],
      { revalidate: 10 },
    )();
    return { ok: true, data: await data };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.message);
      return { ok: false, error: e.message, status: e.code };
    } else {
      console.error(e);
      return { ok: false, error: "Internal Server Error", status: "500" };
    }
  }
};
