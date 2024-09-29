import prisma from "@database/prisma/instance";
import { SubmissionResult } from "@prisma/client";
import { expect, test } from "vitest";

import { calcScore, getResult } from "@/utils";

test("dsd_insert_update_diff", async () => {
  const debugSubmissions = await prisma.debugSubmissions.findMany({
    select: {
      id: true,
      score: true,
      result: true,
      submission: {
        select: {
          score: true,
          result: true,
        },
      },
      debugSubmissionsDiff: {
        select: {
          diff: true,
        },
      },
      debugProblem: {
        select: {
          minDiff: true,
          submission: {
            select: {
              score: true,
            },
          },
        },
      },
    },
  });
  debugSubmissions.forEach((debugSubmission) => {
    expect(
      calcScore({
        problemScore: debugSubmission.debugProblem.submission.score,
        submissionScore: debugSubmission.submission.score,
        minDiff: debugSubmission.debugProblem.minDiff,
        submissionDiff: debugSubmission?.debugSubmissionsDiff?.diff,
      }),
    ).toStrictEqual(debugSubmission.score);
    expect(
      getResult(debugSubmission.score, debugSubmission.submission.result),
    ).toStrictEqual(debugSubmission.result);
  });
  await prisma.debugSubmissions.updateMany({
    data: {
      result: SubmissionResult.Q,
      score: 0,
    },
  });
  prisma.$queryRaw`UPDATE debug_submissions_diff SET diff = diff;`.then(
    async () => {
      const debugSubmissionsAfterUpdate =
        await prisma.debugSubmissions.findMany({
          select: {
            id: true,
            score: true,
            result: true,
            submission: {
              select: {
                score: true,
                result: true,
              },
            },
            debugSubmissionsDiff: {
              select: {
                diff: true,
              },
            },
            debugProblem: {
              select: {
                minDiff: true,
                submission: {
                  select: {
                    score: true,
                  },
                },
              },
            },
          },
        });
      debugSubmissionsAfterUpdate.forEach((debugSubmission) => {
        expect(
          calcScore({
            problemScore: debugSubmission.debugProblem.submission.score,
            submissionScore: debugSubmission.submission.score,
            minDiff: debugSubmission.debugProblem.minDiff,
            submissionDiff: debugSubmission?.debugSubmissionsDiff?.diff,
          }),
        ).toStrictEqual(debugSubmission.score);
        expect(
          getResult(debugSubmission.score, debugSubmission.submission.result),
        ).toStrictEqual(debugSubmission.result);
      });
    },
  );
});
