import prisma from "@database/prisma/instance";
import type { DebugSubmissions } from "@prisma/client";

import type { Results } from "@/types";
import { calcScore, getResult } from "@/utils";

import { getSubmissionDiff } from "./getSubmissionDiff";

export const calcSubmissionScore = async (drid: DebugSubmissions["drid"]) => {
  const runQuery = async (): Promise<{ result: string; score: number }> => {
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        const debugSubmission = await prisma.debugSubmissions.findUniqueOrThrow({
          where: {
            drid,
          },
          select: {
            runs: {
              select: {
                result: true,
                score: true,
              },
            },
          },
        });
        if (debugSubmission.runs.result !== "Q") {
          clearInterval(interval);
          resolve(debugSubmission.runs);
        }
      }, 1000);
    });
  };

  const debugSubmission = await prisma.debugSubmissions.findUniqueOrThrow({
    where: {
      drid,
    },
    select: {
      debug_problems: {
        select: {
          mindiff: true,
          code: true,
          score: true,
        },
      },
    },
  });

  const run = await runQuery();

  const diff = await getSubmissionDiff(drid);

  const scoreData = {
    problemScore: debugSubmission.debug_problems.score,
    submissionScore: run.score,
    minDiff: debugSubmission.debug_problems.mindiff,
    submissionDiff: diff,
  };
  const newScore = await calcScore(scoreData);
  const newResult = await getResult(newScore, run.result as Results);
  await prisma.debugSubmissions.update({
    where: {
      drid,
    },
    data: {
      score: newScore,
      result: newResult,
    },
  });
};
