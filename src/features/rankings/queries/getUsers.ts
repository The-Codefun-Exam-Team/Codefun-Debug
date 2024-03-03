import prisma from "@database/prisma/instance";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { gravatarFromEmail } from "@utils/shared";
import { unstable_cache } from "next/cache";

import type { RankingsData } from "../types";

export const getUsers = async (
  group: string,
  page: string,
  limit: string,
): Promise<RankingsData[]> => {
  try {
    // calculate offset
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Raw SQL to query score and ranking (prisma not supporting nested group by yet)
    const rankTableQuery = prisma.$queryRaw`
      WITH score_table AS (SELECT tid, dpid, MAX(score) as max_score FROM debug_submissions GROUP BY tid, dpid),
      rank_table AS (SELECT teams.tid, RANK() OVER (ORDER BY SUM(score_table.max_score) DESC) AS rank, SUM(score_table.max_score) AS score
      FROM score_table 
      INNER JOIN teams ON teams.tid = score_table.tid
      GROUP BY tid
      ORDER BY score DESC)
      SELECT rank_table.tid, rank_table.rank, rank_table.score, teams.group
      FROM rank_table INNER JOIN teams ON teams.tid = rank_table.tid
      WHERE (CASE WHEN ${parseInt(group)} = 0 THEN 1=1 ELSE teams.group = ${parseInt(group)} END)
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

    return unstable_cache(
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
          } satisfies RankingsData;
        });
        return users.sort((a, b) => a.rank - b.rank);
      },
      [`getUsers-${group}-${page}-${limit}`],
      { revalidate: 10 },
    )();
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
    } else {
      console.error(e);
    }
    throw "Internal Server Error";
  }
};
