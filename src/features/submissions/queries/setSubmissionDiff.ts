import prisma from "@database/prisma/instance";

import type { FunctionReturnType } from "@/types";
import { handleCatch } from "@/utils";

export const setSubmissionDiff = async (
  debugSubmissionId: number,
  diff: number,
): Promise<FunctionReturnType> => {
  try {
    await prisma.debugSubmissionsDiff.upsert({
      where: {
        id: debugSubmissionId,
      },
      create: {
        id: debugSubmissionId,
        diff,
      },
      update: {
        diff,
      },
    });
    return { ok: true };
  } catch (e) {
    return handleCatch(e);
  }
};
