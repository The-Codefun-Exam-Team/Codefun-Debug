import prisma from "@database/prisma/instance";
import { cookies } from "next/headers";

import type { Results } from "@/shared/types";

import type { ProblemList } from "./getAllProblem";
import type { DetailedScoreInfo } from "./getProblemScore";
import { getUserInfo } from "./getUserInfo";

export type ProblemScoreMap = Record<number, DetailedScoreInfo>;

export type GetAllProblemsScoreResult =
  | { ok: true; data: ProblemScoreMap }
  | { ok: false; status: number; error: string };

export const getAllProblemsScore = async (
  problems: ProblemList,
): Promise<GetAllProblemsScoreResult | undefined> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  if (!token || !token.value) {
    return undefined;
  }

  if (problems.length === 0) {
    return { ok: true, data: {} };
  }

  const user = await getUserInfo(token.value);
  if (!user.ok) {
    return { ok: false, status: user.status, error: user.error };
  }

  const tid = user.user.id;
  const scoreTable = await prisma.debugSubmissions.groupBy({
    by: ["dpid"],
    where: {
      tid: tid,
    },
    _max: {
      score: true,
    },
  });
  const subsInfo = await prisma.debugSubmissions.findMany({
    where: {
      tid: tid,
      OR: scoreTable.map((problem) => ({
        AND: [
          {
            dpid: problem.dpid,
          },
          {
            score: problem._max.score ?? 0,
          },
        ],
      })),
    },
    select: {
      dpid: true,
      diff: true,
      score: true,
      result: true,
      drid: true,
    },
    orderBy: {
      dpid: "asc",
    },
  });

  const result: ProblemScoreMap = {};

  for (const { dpid, result: subResult, score, ...subInfo } of subsInfo) {
    if (score === 0) {
      result[dpid] = {
        score: 0,
        result: null,
        diff: null,
        drid: null,
      };
    } else {
      result[dpid] = {
        score,
        result: subResult as Results,
        ...subInfo,
      };
    }
  }

  return { ok: true, data: result };
};
