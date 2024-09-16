import prisma from "@database/prisma/instance";

import { verifyCodefunWithMemo } from "@/features/auth";
import { getProblemWithMemo } from "@/features/problems";
import { submitCodefun } from "@/features/submissions";
import type { FunctionReturnType } from "@/types";
import { calcEditDistance, handleCatch } from "@/utils";

export const submit = async (
  debugProblemCode: string,
  source: string,
): Promise<FunctionReturnType<number>> => {
  try {
    const debugProblem = await getProblemWithMemo(debugProblemCode);
    if (!debugProblem.ok) {
      return {
        ok: false,
        message: debugProblem.message,
        status: debugProblem.status,
      };
    }
    const debugProblemData = debugProblem.data;
    const user = await verifyCodefunWithMemo();
    if (!user.ok) {
      return {
        ok: false,
        message: user.message,
        status: user.status,
      };
    }
    const {
      language,
      statement: { code: problemCode },
    } = debugProblemData;
    const codefunSubmission = await submitCodefun({
      code: problemCode,
      source,
      language,
    });
    if (!codefunSubmission.ok) {
      return {
        ok: false,
        message: codefunSubmission.message,
        status: codefunSubmission.status,
      };
    }
    const debugSubmission = await prisma.debugSubmissions.create({
      data: {
        subId: codefunSubmission.data,
        userId: user.data.id,
        debugProblemId: debugProblemData.id,
        debugSubmissionsDiff: {
          create: {
            diff: calcEditDistance(debugProblemData.source, source),
          },
        },
      },
      select: {
        id: true,
      },
    });

    return {
      ok: true,
      data: debugSubmission.id,
    };
  } catch (e) {
    return handleCatch(e);
  }
};
