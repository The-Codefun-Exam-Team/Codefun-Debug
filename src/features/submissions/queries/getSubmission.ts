import prisma from "@database/prisma/instance";
import type { DebugProblems, DebugSubmissions } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { getProblem } from "@/features/problems";
import type { DetailedSubmissionsInfo } from "@/features/submissions";
import { parseJudge } from "@/utils";

export const getSubmission = async (id: number): Promise<DetailedSubmissionsInfo> => {
  const query = await prisma.debugSubmissions.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      result: true,
      score: true,
      diff: true,
      user: {},
      submission: {
        select: {
          runningTime: true,
          createdAt: true,
          judgeOutput: true,
          language: true,
        },
      },
      debugProblem: {
        select: {
          debugProblemCode: true,
          submission: {
            select: {
              judgeOutput: true,
            },
          },
        },
      },
    },
  });
  return {
    id: query.id,
    scoreInfo: {
      score: query.score,
      diff: query.diff,
      result: query.result,
    },
    submitTime: query.submission.createdAt.getTime(),
    runtime: query.submission.runningTime,
    debugProblem: {
      debugProblemCode: query.debugProblem.debugProblemCode,
      judge: parseJudge(query.debugProblem.submission.judgeOutput),
    },
    language: query.submission.language,
    judge: parseJudge(query.submission.judgeOutput),
    user: {},
  };
};
