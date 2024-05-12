import prisma from "@database/prisma/instance";
import { cache } from "react";

import type { DetailedScoreInfo, UserData } from "@/types";

export type ProblemScoreMap = Record<number, DetailedScoreInfo>;

export const getProblemsScore = async (user: UserData) => {
  console.log("getProblemsScore");
  const query = await prisma.debugSubmissions.findMany({
    where: {
      userId: user.id,
      is_best: true,
    },
    select: {
      subId: true,
      debugProblemId: true,
      score: true,
      diff: true,
      result: true,
    },
  });
  const result: ProblemScoreMap = {};
  for (const { debugProblemId, ...subInfo } of query) {
    result[debugProblemId] = subInfo;
  }
  return result;
};

export const getMemoProblemsScore = cache(getProblemsScore);
