import prisma from "@database/prisma/instance";
import { cookies } from "next/headers";

import { getMemoUser } from "@/features/auth";
import { getMemoProblem } from "@/features/problems";
import {
  setSubmissionDiff,
  submitCodefunProblem,
} from "@/features/submissions";
import { calcEditDistance } from "@/utils";

export const submit = async (debugProblemCode: string, source: string) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  const debugProblem = await getMemoProblem(debugProblemCode);
  const user = await getMemoUser(token?.value);
  if (!user.ok) {
    throw new Error("You are not logged in");
  }
  const {
    language,
    statement: { code: problemCode },
  } = debugProblem;
  const submissionId = await submitCodefunProblem({
    code: problemCode,
    source,
    language,
  });
  const debugSubmission = await prisma.debugSubmissions.create({
    data: {
      subId: submissionId,
      userId: user.user.id,
      debugProblemId: debugProblem.id,
    },
    select: {
      id: true,
    },
  });

  void setSubmissionDiff(
    debugSubmission.id,
    calcEditDistance(debugProblem.source, source),
  );

  return debugSubmission.id;
};
