import { SubmissionResult } from "@prisma/client";

import { genJudge } from "@/utils";

import prisma from "../instance";
import { PROBLEMS_COUNT } from "./problems";
import { USERS_COUNT } from "./users";

const SUBMISSIONS_COUNT = 2000;

export const seedSubmissions = async () => {
  await prisma.submissions.createMany({
    data: Array.from({ length: SUBMISSIONS_COUNT }, (_, i) => {
      const problemId = (i % PROBLEMS_COUNT) + 1;
      const userId = (i % USERS_COUNT) + 1;
      const test = [
        { verdict: SubmissionResult.AC, runningTime: 0.1, message: "Accepted" },
        {
          verdict: SubmissionResult.WA,
          runningTime: 0.2,
          message: "Wrong answer",
        },
        {
          verdict: SubmissionResult.TLE,
          runningTime: 1.1,
          message: "Time limit exceeded",
        },
        {
          verdict: SubmissionResult.RTE,
          runningTime: 0.1,
          message: "Runtime error",
        },
        {
          verdict: SubmissionResult.MLE,
          runningTime: 0.1,
          message: "Memory limit exceeded",
        },
      ];
      const tests = Array.from({ length: 10 }, (_, j) =>
        i % 2 ? test[(i + j) % 5] : test[0],
      );
      const correctsCount = tests.filter(
        (test) => test.verdict === "AC",
      ).length;
      const judgeOutput = genJudge({
        total: 10,
        correct: correctsCount,
        tests,
      });
      return {
        problemId,
        userId,
        language: "C__",
        runningTime: 0.1 * ((i % 9) + 1),
        isBest: false,
        source:
          "This is a source code. The next line is to makes source codes varies.\n" +
          "".padStart(i % 10, "0"),
        judgeOutput,
        score: correctsCount * 10,
        result:
          i % 2
            ? [SubmissionResult.WA, SubmissionResult.TLE, SubmissionResult.RTE][
                i % 3
              ]
            : SubmissionResult.AC,
      };
    }),
  });
};
