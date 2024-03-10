import prisma from "@database/prisma/instance";
import type { DebugSubmissions } from "@prisma/client";

import type { Results, UserData } from "@/types";

interface DetailedScoreInfoNotNull {
  score: number;
  diff: number | null;
  result: Results;
  drid: number;
}

interface DetailedScoreInfoNull {
  score: 0;
  diff: null;
  result: null;
  drid: null;
}

export type DetailedScoreInfo = DetailedScoreInfoNotNull | DetailedScoreInfoNull;

export type GetProblemScoreResult =
  | { ok: true; data: DetailedScoreInfo }
  | { ok: false; error: string; status: number };

type SqlRawRunInfo = Pick<DebugSubmissions, "drid" | "score" | "diff" | "result">;

export const getProblemScore = async (
  problemId: string,
  user: UserData,
): Promise<GetProblemScoreResult> => {
  const tid = user.id;

  // benchmark required
  const runInfos = await prisma.$queryRaw<SqlRawRunInfo[]>`
    SELECT ds.drid, ds.score, ds.diff, ds.result
    FROM debug_submissions ds
    JOIN debug_problems dp ON ds.dpid = dp.dpid
    WHERE ds.tid = ${tid} AND dp.code = ${problemId} AND ds.score = (
      SELECT MAX(ds.score) AS score 
      FROM debug_submissions ds
      JOIN debug_problems dp ON ds.dpid = dp.dpid
      WHERE ds.tid = ${tid} AND dp.code = ${problemId}
    )
  `;

  if (runInfos.length === 0) {
    return {
      ok: true,
      data: {
        score: 0,
        diff: null,
        result: null,
        drid: null,
      },
    };
  }

  const runInfo = runInfos[0];

  return {
    ok: true,
    data: {
      score: runInfo.score,
      diff: runInfo.diff,
      result: runInfo.result as Results,
      drid: runInfo.drid,
    },
  };
};
