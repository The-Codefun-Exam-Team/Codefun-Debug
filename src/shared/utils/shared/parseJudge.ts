import type { Results } from "@/shared/types";

export interface Judge {
  correct: number;
  total: number;
  tests: { verdict: Results; runningTime: number; messages: string }[];
}

export const parseJudge = (judge: string): Judge | string => {
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
      const [verdict, runningTime, messages] = x.split("|");
      return {
        verdict: verdict as Results,
        runningTime: parseFloat(runningTime),
        messages: messages,
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
