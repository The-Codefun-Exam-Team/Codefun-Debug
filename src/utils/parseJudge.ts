import type { SubmissionResult } from "@prisma/client";

export interface Judge {
  correct: number;
  total: number;
  tests: { verdict: SubmissionResult; runningTime: number; message: string }[];
}

export const parseJudge = (judge: string | null): Judge | string => {
  if (!judge) {
    return "No judge output";
  }
  try {
    if (judge.split("////").length !== 2) {
      return judge;
    }
    const [scoreString, testsString] = judge.split("////");
    if (scoreString.split("/").length !== 2) {
      return judge;
    }
    const [correct, total] = scoreString.split("/").map((x) => parseInt(x));
    const rawTests = testsString.split("||").map((x) => {
      if (x.split("|").length !== 3) {
        return;
      }
      const [verdict, runningTime, message] = x.split("|");
      return {
        verdict: verdict as SubmissionResult,
        runningTime: parseFloat(runningTime),
        message: message,
      };
    });
    const tests = rawTests.filter((x) => x !== undefined) as Judge["tests"];
    return {
      correct,
      total,
      tests,
    };
  } catch (e) {
    return judge;
  }
};

export const genJudge = (judge: Judge | string) => {
  if (typeof judge === "string") {
    return judge;
  }
  const { correct, total, tests } = judge;
  const summary = `${correct}/${total}`;
  const details = tests
    .map((x) => `${x.verdict}|${x.runningTime}|${x.message}`)
    .join("||");
  return `${summary}////${details}`;
};
