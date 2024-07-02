import prisma from "@database/prisma/instance";
import { unstable_noStore } from "next/cache";

import type { DetailedSubmissionsInfo } from "@/features/submissions";
import { LANGUAGES_DICT, type UserDisplayInfo } from "@/types";
import { parseJudge } from "@/utils";

export const getSubmission = async (
  id: number,
): Promise<DetailedSubmissionsInfo> => {
  unstable_noStore();

  const query = await prisma.debugSubmissionQuery.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      score: true,
      diff: true,
      result: true,
      submitTime: true,
      runtime: true,
      source: true,
      debugProblemCode: true,
      debugProblemJudge: true,
      debugProblemLanguage: true,
      debugProblemSource: true,
      debugSubmissionJudge: true,
      username: true,
      userDisplayName: true,
      userGroupName: true,
      userStatus: true,
      userScore: true,
      userRatio: true,
      userRank: true,
    },
  });
  return {
    id: query.id,
    scoreInfo: {
      score: query.score,
      diff: query.diff,
      result: query.result,
    },
    submitTime: query.submitTime,
    runtime: query.runtime,
    source: query.source,
    debugProblem: {
      debugProblemCode: query.debugProblemCode,
      judge: parseJudge(query.debugProblemJudge),
      language: LANGUAGES_DICT[query.debugProblemLanguage],
      source: query.debugProblemSource,
    },
    judge: parseJudge(query.debugSubmissionJudge),
    user: {
      username: query.username,
      displayName: query.userDisplayName,
      groupName: query.userGroupName,
      status: query.userStatus,
      score: query.userScore?.toFixed(2) ?? null,
      ratio: query.userRatio?.toNumber() ?? null,
      rank: Number(query.userRank),
    } as UserDisplayInfo,
  };
};
