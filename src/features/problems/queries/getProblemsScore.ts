import prisma from "@database/prisma/instance";
import { cache } from "react";

import type { DetailedScoreInfo, UserData } from "@/types";

export type ProblemScoreMap = Record<number, DetailedScoreInfo>;

export const getProblemsScore = async (user: UserData) => {
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
      debugProblems: {
        select: {
          id: true,
          debugProblemCode: true,
        },
      },
    },
  });
  const result: ProblemScoreMap = {};
  for (const { debugProblems, id, ...dsubInfo } of query) {
    result[debugProblems.id] = { dsubId: id, ...dsubInfo };
  }
  return result;
};

export const getMemoProblemsScore = cache(getProblemsScore);
