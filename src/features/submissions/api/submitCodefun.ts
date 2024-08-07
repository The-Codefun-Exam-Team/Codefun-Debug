import prisma from "@database/prisma/instance";
import { cookies } from "next/headers";

import { type FunctionReturnType, REVERSE_LANGUAGES_DICT } from "@/types";
import { genJudge, handleCatch } from "@/utils";

import { getSubmissionCodefun } from "./getSubmissionCodefun";

export const submitCodefun = async ({
  code,
  source,
  language,
}: {
  code: string;
  source: string;
  language: string;
}): Promise<FunctionReturnType<number>> => {
  try {
    const token = cookies().get("token");
    const requestToCodefun = await fetch("https://codefun.vn/api/submit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        problem: code,
        language: language,
        code: source,
      }),
    });
    if (!requestToCodefun.ok) {
      const res = await requestToCodefun.json();
      return {
        ok: false,
        message: res.error,
        status: requestToCodefun.status,
      };
    }
    const res = await requestToCodefun.json();
    if (process.env.NODE_ENV === "development") {
      const codefunSubmissionQuery = await getSubmissionCodefun(res.data);
      if (!codefunSubmissionQuery.ok) {
        return {
          ok: false,
          message: codefunSubmissionQuery.message,
          status: codefunSubmissionQuery.status,
        };
      }
      const codefunSubmission = codefunSubmissionQuery.data;
      await prisma.submissions.create({
        data: {
          id: codefunSubmission.id,
          problemId: codefunSubmission.problem.id,
          userId: codefunSubmission.owner.id,
          language: REVERSE_LANGUAGES_DICT[codefunSubmission.language],
          result: codefunSubmission.result,
          runningTime: codefunSubmission.runningtime,
          score: codefunSubmission.score,
          isBest: false,
          source: codefunSubmission.code,
          judgeOutput: genJudge(codefunSubmission.judge),
          scoredAt: new Date(Date.now()),
        },
      });
    }
    return {
      ok: true,
      data: res.data,
    };
  } catch (e) {
    return handleCatch(e);
  }
};
