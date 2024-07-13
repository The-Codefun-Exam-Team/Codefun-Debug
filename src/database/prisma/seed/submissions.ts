import { SubmissionResult } from "@prisma/client";

import { genJudge } from "@/utils";

import { seedPrisma } from "./connector";
import { PROBLEMS_COUNT } from "./problems";
import { USERS_COUNT } from "./users";

const SUBMISSIONS_COUNT = 2000;

export const seedSubmissions = async () => {
  await seedPrisma.submissions.createMany({
    data: Array.from({ length: SUBMISSIONS_COUNT }, (_, i) => {
      const problemId = (i % PROBLEMS_COUNT) + 1;
      const userId = (i % USERS_COUNT) + 1;
      const judgeOutput =
        i % 2
          ? genJudge({
              correct: 3,
              total: 10,
              tests: [
                { verdict: "AC", runningTime: 0.1, message: "Accepted" },
                { verdict: "WA", runningTime: 0.2, message: "Wrong answer" },
                {
                  verdict: "TLE",
                  runningTime: 1.1,
                  message: "Time limit exceeded",
                },
                { verdict: "RTE", runningTime: 0.1, message: "Runtime error" },
                { verdict: "AC", runningTime: 0.1, message: "Accepted" },
                { verdict: "WA", runningTime: 0.2, message: "Wrong answer" },
                {
                  verdict: "TLE",
                  runningTime: 1.1,
                  message: "Time limit exceeded",
                },
                { verdict: "RTE", runningTime: 0.1, message: "Runtime error" },
                { verdict: "AC", runningTime: 0.1, message: "Accepted" },
                { verdict: "WA", runningTime: 0.2, message: "Wrong answer" },
              ],
            })
          : genJudge({
              correct: 3,
              total: 10,
              tests: [
                { verdict: "WA", runningTime: 0.2, message: "Wrong answer" },
                { verdict: "AC", runningTime: 0.1, message: "Accepted" },
                {
                  verdict: "TLE",
                  runningTime: 1.1,
                  message: "Time limit exceeded",
                },
                { verdict: "RTE", runningTime: 0.1, message: "Runtime error" },
                { verdict: "AC", runningTime: 0.1, message: "Accepted" },
                { verdict: "RTE", runningTime: 0.1, message: "Runtime error" },
                {
                  verdict: "TLE",
                  runningTime: 1.1,
                  message: "Time limit exceeded",
                },
                { verdict: "WA", runningTime: 0.2, message: "Wrong answer" },
                { verdict: "WA", runningTime: 0.2, message: "Wrong answer" },
                { verdict: "AC", runningTime: 0.1, message: "Accepted" },
              ],
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
        score: 30,
        result: [
          SubmissionResult.WA,
          SubmissionResult.TLE,
          SubmissionResult.RTE,
        ][i % 3],
      };
    }),
  });
};
