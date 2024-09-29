import prisma from "@database/prisma/instance";
import { unstable_noStore } from "next/cache";

import type { FunctionReturnType, ScoreDisplayInfo } from "@/types";
import { handleCatch } from "@/utils";

export const getProblemScore = async (
  debugProblemId: number,
  userId: number,
): Promise<FunctionReturnType<ScoreDisplayInfo>> => {
  unstable_noStore();
  try {
    const query = await prisma.debugSubmissions.findFirst({
      where: {
        userId,
        debugProblemId,
        is_best: true,
      },
      select: {
        id: true,
        score: true,
        result: true,
        debugSubmissionsDiff: true,
      },
    });
    const data = query
      ? {
          score: query.score,
          diff: query.debugSubmissionsDiff?.diff ?? 1e5,
          result: query.result,
          debugSubmissionId: query.id,
        }
      : null;
    return {
      ok: true,
      data: data,
    };
  } catch (e) {
    return handleCatch(e);
  }
};
