import prisma from "@database/prisma/instance";
import { unstable_noStore } from "next/cache";

import { verifyCodefunWithMemo } from "@/features/auth";
import type { DetailedSubmissionsInfo } from "@/features/submissions";
import {
  type FunctionReturnType,
  LANGUAGES_DICT,
  type UserDisplayInfo,
} from "@/types";
import { gravatarFromEmail, handleCatch, parseJudge } from "@/utils";

export const getSubmission = async (
  id: number,
): Promise<FunctionReturnType<DetailedSubmissionsInfo>> => {
  unstable_noStore();
  try {
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
        userEmail: true,
      },
    });

    const author = (): UserDisplayInfo => {
      if (query.userStatus === "banned") {
        return {
          username: query.username,
          displayName: query.userDisplayName,
          groupName: query.userGroupName,
          status: "banned",
          avatar: gravatarFromEmail(query.userEmail),
          ratio: null,
          score: null,
          rank: null,
        } satisfies UserDisplayInfo;
      }
      if (
        query.userScore === null ||
        query.userRatio === null ||
        query.userRank === null
      ) {
        throw new Error("Internal Server Error");
      }
      return {
        username: query.username,
        displayName: query.userDisplayName,
        groupName: query.userGroupName,
        status: "normal",
        score: query.userScore.toString(),
        ratio: query.userRatio.toNumber(),
        rank: Number(query.userRank),
        avatar: gravatarFromEmail(query.userEmail),
      } satisfies UserDisplayInfo;
    };

    const user = await verifyCodefunWithMemo();
    const canViewCode =
      user.ok &&
      (user.data.status == "Admin" || user.data.username == author().username);
    const data = {
      id: query.id,
      scoreInfo: {
        score: query.score,
        diff: query.diff,
        result: query.result,
      },
      submitTime: query.submitTime,
      runtime: query.runtime,
      source: canViewCode ? query.source : "",
      debugProblem: {
        debugProblemCode: query.debugProblemCode,
        judge: parseJudge(query.debugProblemJudge),
        language: LANGUAGES_DICT[query.debugProblemLanguage],
        source: query.debugProblemSource,
      },
      judge: parseJudge(query.debugSubmissionJudge),
      user: author(),
    };
    return {
      ok: true,
      data: data,
    };
  } catch (e) {
    return handleCatch(e);
  }
};
