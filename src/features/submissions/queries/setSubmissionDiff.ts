import prisma from "@database/prisma/instance";

import type { FunctionReturnType } from "@/types";
import { handleCatch } from "@/utils";

export const setSubmissionDiff = async (
  debugSubmissionId: number,
  diff: number,
): Promise<FunctionReturnType> => {
  try {
    await prisma.debugSubmissions.update({
      where: {
        id: debugSubmissionId,
      },
      data: {
        diff,
      },
    });
    return { ok: true };
  } catch (e) {
    return handleCatch(e);
  }
};
