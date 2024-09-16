import prisma from "@database/prisma/instance";
import { cache } from "react";

import { verifyCodefunWithMemo } from "@/features/auth";
import type { FunctionReturnType, ScoreDisplayInfo } from "@/types";
import { handleCatch } from "@/utils";

type ProblemScoreMap = Record<number, ScoreDisplayInfo>;

const getProblemsScore = async (): Promise<
  FunctionReturnType<ProblemScoreMap>
> => {
  try {
    const user = await verifyCodefunWithMemo();
    if (!user.ok) {
      return { ok: false, message: user.message, status: user.status };
    }
    const query = await prisma.debugSubmissions.findMany({
      where: {
        userId: user.data.id,
        is_best: true,
      },
      select: {
        id: true,
        score: true,
        debugSubmissionsDiff: true,
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
    for (const {
      debugProblem,
      id,
      debugSubmissionsDiff,
      ...dsubInfo
    } of query) {
      result[debugProblem.id] = {
        debugSubmissionId: id,
        diff: debugSubmissionsDiff?.diff ?? 1e5,
        ...dsubInfo,
      };
    }
    return {
      ok: true,
      data: result,
    };
  } catch (e) {
    return handleCatch(e);
  }
};

export const getProblemsScoreWithMemo = cache(getProblemsScore);
