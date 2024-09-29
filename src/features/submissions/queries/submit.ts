import prisma from "@database/prisma/instance";
import { cookies } from "next/headers";

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
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    const debugProblemQuery = await getProblemWithMemo(debugProblemCode);
    const userQuery = await verifyCodefunWithMemo(token?.value);
    if (!userQuery.ok) {
      return {
        ok: false,
        message: userQuery.message,
        status: userQuery.status,
      };
    }
    if (!debugProblemQuery.ok) {
      return {
        ok: false,
        message: debugProblemQuery.message,
        status: debugProblemQuery.status,
      };
    }
    const {
      language,
      statement: { code: problemCode },
    } = debugProblemQuery.data;
    const submitCodefunQuery = await submitCodefun({
      code: problemCode,
      source,
      language,
    });
    if (!submitCodefunQuery.ok) {
      return {
        ok: false,
        message: submitCodefunQuery.message,
        status: submitCodefunQuery.status,
      };
    }
    const debugSubmission = await prisma.debugSubmissions.create({
      data: {
        subId: submitCodefunQuery.data,
        userId: userQuery.data.id,
        debugProblemId: debugProblemQuery.data.id,
        debugSubmissionsDiff: {
          create: {
            diff: calcEditDistance(debugProblemQuery.data.source, source),
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
