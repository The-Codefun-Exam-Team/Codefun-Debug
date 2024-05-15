import prisma from "@database/prisma/instance";
import { cache } from "react";

import type { ScoreDisplayInfo, UserInfo } from "@/types";

export type ProblemScoreMap = Record<number, ScoreDisplayInfo>;

export const getProblemsScore = async (user: UserInfo) => {
  const query = await prisma.debugSubmissions.findMany({
    where: {
      userId: user.id,
      is_best: true,
    },
    select: {
      id: true,
      score: true,
      diff: true,
      result: true,
      debugProblem: {
        select: {
          id: true,
          debugProblemCode: true,
        },
      },
    },
  });
  const result: ProblemScoreMap = {};
  for (const { debugProblem, id, ...dsubInfo } of query) {
    result[debugProblem.id] = { debugSubmissionId: id, ...dsubInfo };
  }
  return result;
};

export const getMemoProblemsScore = cache(getProblemsScore);
