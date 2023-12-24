import prisma from "@database/prisma/instance";
import { cache } from "react";

import type { Results, UserData } from "@/shared/types";

import type { DetailedScoreInfo } from "./getProblemScore";

export type ProblemScoreMap = Record<number, DetailedScoreInfo>;

export type GetAllProblemsScoreResult =
  | { ok: true; data: ProblemScoreMap }
  | { ok: false; status: number; error: string };

const getAllProblemsScoreBase = async (user: UserData): Promise<GetAllProblemsScoreResult> => {
  const tid = user.id;
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

export const getAllProblemsScore = cache(getAllProblemsScoreBase);
