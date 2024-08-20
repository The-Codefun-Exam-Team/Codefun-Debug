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
        diff: true,
        result: true,
      },
    });
    const data = query
      ? {
          score: query.score,
          diff: query.diff,
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
