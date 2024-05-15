import prisma from "@database/prisma/instance";

import type { ScoreDisplayInfo } from "@/types";

export const getProblemScore = async (
  debugProblemId: number,
  userId: number,
): Promise<ScoreDisplayInfo> => {
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
      debugSubmissionId: query.id,
    };
  }
  return null;
};
