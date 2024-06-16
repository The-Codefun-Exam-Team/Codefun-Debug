import prisma from "@database/prisma/instance";
import { cookies } from "next/headers";

import { verifyCodefun } from "@/features/auth";
import { getProblem } from "@/features/problems";
import {
  setSubmissionDiff,
  submitCodefunProblem,
} from "@/features/submissions";
import { calcEditDistance } from "@/utils";

export const submit = async (debugProblemCode: string, source: string) => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    const debugProblem = await getProblem(debugProblemCode);
    if (!debugProblem.ok) {
      throw new Error(debugProblem.message);
    }
    const debugProblemData = debugProblem.data;
    const user = await verifyCodefun(token?.value);
    if (!user.ok) {
      throw new Error("You are not logged in");
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

    return debugSubmission.id;
  } catch (e) {
    if (e instanceof Error) {
    }
  }
};
