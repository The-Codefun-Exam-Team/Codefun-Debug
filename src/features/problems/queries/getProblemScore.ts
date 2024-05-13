import prisma from "@database/prisma/instance";

import type { DetailedScoreInfo } from "@/types";

export const getProblemScore = async (
  debugProblemId: number,
  userId: number,
): Promise<DetailedScoreInfo> => {
  const query = await prisma.debugSubmissions.findFirst({
    where: {
      userId,
      debugProblemId,
      is_best: true,
    },
    select: {
      id: true,
      score: true,
      diff: true,
      result: true,
    },
  });
  if (query) {
    return {
      score: query.score,
      diff: query.diff,
      result: query.result,
      dsubId: query.id,
    };
  }
  return null;
};
