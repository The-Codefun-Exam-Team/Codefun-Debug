import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { gravatarFromEmail } from "@utils/shared";
import { unstable_cache } from "next/cache";

import prisma from "@/database/prisma/instance";

interface returnData {
  tid: number;
  name: string;
  username: string;
  status: string;
  gid: number;
  groupname: string;
  email: string;
  score: number;
  solved: number;
  rank: number;
}

export const getUsers = async (group: string, page: string, limit: string) => {
  const offset = (parseInt(page) - 1) * parseInt(limit);

  const globalQuery = await prisma.$queryRaw`
  WITH score_table AS (SELECT tid, dpid, MAX(score) as max_score FROM debug_submissions GROUP BY tid, dpid),
  rank_table AS (SELECT tid, RANK() OVER (ORDER BY SUM(score_table.max_score) DESC) AS rank from score_table GROUP BY tid)
  SELECT groups.gid, SUM(score_table.max_score) as score, rank_table.rank, teams.teamname as username, teams.name, groups.groupname, teams.email, teams.solved, teams.tid
  FROM score_table 
  INNER JOIN teams ON teams.tid = score_table.tid
  INNER JOIN groups ON groups.gid = teams.group
  INNER JOIN rank_table ON teams.tid = rank_table.tid

  GROUP BY score_table.tid 
  ORDER BY score DESC
  LIMIT ${parseInt(limit)} OFFSET ${offset}
  ;`;

  const groupQuery = prisma.$queryRaw`
  WITH score_table AS (SELECT tid, dpid, MAX(score) as max_score FROM debug_submissions GROUP BY tid, dpid),
  rank_table AS (SELECT tid, RANK() OVER (ORDER BY SUM(score_table.max_score) DESC) AS rank from score_table GROUP BY tid)
  SELECT groups.gid, SUM(score_table.max_score) as score, rank_table.rank, teams.teamname as username, teams.name, groups.groupname, teams.email, teams.solved
  FROM score_table 
  INNER JOIN teams ON teams.tid = score_table.tid
  INNER JOIN groups ON groups.gid = teams.group
  INNER JOIN rank_table ON teams.tid = rank_table.tid
  
  WHERE groups.gid = ${parseInt(group)}
  GROUP BY score_table.tid 
  ORDER BY score DESC
  LIMIT ${parseInt(limit)} OFFSET ${offset}
  ;`;

  try {
    return unstable_cache(
      async () => {
        const problemsCount = await prisma.problems.count();
        const users = (parseInt(group) > 0 ? await groupQuery : await globalQuery) as returnData[];
        return users.map((user) => ({
          id: user.tid,
          username: user.username,
          name: user.name,
          group: {
            id: user.gid,
            name: user.groupname,
          },
          status: user.status,
          score: user.score,
          ratio: user.solved / problemsCount,
          avatar: gravatarFromEmail(user.email),
          rank: Number(user.rank),
        }));
      },
      [`getUsers-${group}-${page}-${limit}`],
      { revalidate: 10 },
    )();
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    return null;
  }
};
