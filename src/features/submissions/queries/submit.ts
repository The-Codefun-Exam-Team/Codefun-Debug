import prisma from "@database/prisma/instance";

import { verifyCodefunWithMemo } from "@/features/auth";
import { getProblemWithMemo } from "@/features/problems";
import {
  setSubmissionDiff,
  submitCodefunProblem,
} from "@/features/submissions";
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
    const submissionId = await submitCodefunProblem({
      code: problemCode,
      source,
      language,
    });
    const debugSubmission = await prisma.debugSubmissions.create({
      data: {
        subId: submissionId,
        userId: user.data.id,
        debugProblemId: debugProblemData.id,
      },
      select: {
        id: true,
      },
    });

    void setSubmissionDiff(
      debugSubmission.id,
      await calcEditDistance(debugProblemData.source, source),
    );

    return {
      ok: true,
      data: debugSubmission.id,
    };
  } catch (e) {
    return handleCatch(e);
  }
};
