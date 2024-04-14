import prisma from "@database/prisma/instance";
import { type DebugProblems, Prisma } from "@prisma/client";
import { calcScore, getResult } from "@utils/shared";

import { getSubmissionDiff } from "@/features/submissions";
import type { Results } from "@/types";

export const recalcProblemScore = async (code: DebugProblems["code"]) => {
  const debugProblem = await prisma.debugProblems.findUniqueOrThrow({
    where: {
      code,
    },
    select: {
      mindiff: true,
      score: true,
      debug_submissions: {
        select: {
          drid: true,
          diff: true,
          runs: {
            select: {
              score: true,
              result: true,
            },
          },
        },
      },
    },
  });

  const submissions = debugProblem.debug_submissions;
  let newMinDiff = 1e5;
  submissions.forEach((submission) => {
    newMinDiff = Math.min(newMinDiff, submission.diff || 1e5);
  });

  if (debugProblem.mindiff === newMinDiff) return;

  await prisma.debugProblems.update({
    where: {
      code,
    },
    data: {
      mindiff: newMinDiff,
    },
  });

  const newDataPromise = submissions.map(async (submission) => {
    if (submission.runs.result === "Q") return;
    if (submission.diff === 1e5 || !submission.diff) {
      submission.diff = await getSubmissionDiff(submission.drid);
    }
    const dataScore = {
      problemScore: debugProblem.score,
      submissionScore: submission.runs.score,
      minDiff: newMinDiff,
      submissionDiff: submission.diff,
    };
    const newScore = await calcScore(dataScore);
    const newResult = await getResult(newScore, submission.runs.result as Results);
    return {
      drid: submission.drid,
      score: newScore,
      result: newResult as Results,
    };
  });

  const newData = await Promise.all(newDataPromise);
  const data = [] as { drid: number; score: number; result: Results }[];
  newData.forEach((submission) => {
    if (submission) data.push(submission);
  });
  if (!data.length) return;
  const dataPayload = data.map((data) => Prisma.sql`(${data.drid}, ${data.score}, ${data.result})`);

  await prisma.$queryRaw`
    INSERT IGNORE INTO debug_submissions (drid,score,result)
      VALUES ${Prisma.join(dataPayload)}
    ON DUPLICATE KEY UPDATE
      score = VALUES(score), result = VALUES(result)
  `;
};
