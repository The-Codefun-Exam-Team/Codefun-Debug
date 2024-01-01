import prisma from "@database/prisma/instance";

import type { Results, UserData } from "@/shared/types";

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

export const getProblemScore = async (
  problemId: string,
  user: UserData,
): Promise<GetProblemScoreResult> => {
  const tid = user.id;
  const scoreInfo = await prisma.debugSubmissions.groupBy({
    by: ["dpid"],
    where: {
      tid: tid,
      debug_problems: {
        code: problemId,
      },
    },
    _max: {
      score: true,
    },
  });

  const runInfo = await prisma.debugSubmissions.findMany({
    where: {
      tid: tid,
      debug_problems: {
        code: problemId,
      },
      score: scoreInfo[0]?._max?.score ?? 0,
    },
    select: {
      drid: true,
      score: true,
      diff: true,
      result: true,
    },
  });

  const problemInfoWithScore = {
    score: runInfo[0]?.score ?? 0,
    diff: runInfo[0]?.diff ?? null,
    result: (runInfo[0]?.result as Results) ?? null,
    drid: runInfo[0]?.drid ?? null,
  } as DetailedScoreInfo;

  return {
    ok: true,
    data: problemInfoWithScore,
  };
};
