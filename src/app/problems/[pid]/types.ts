import type { Languages, Results } from "@/shared/types";

interface Judge {
  correct: number;
  total: number;
  tests: {
    verdict: Results;
    runningTime: number;
    message: string;
  }[];
}

export interface ProblemData {
  best_score: number;
  code: string;
  codetext: string;
  problem: {
    code: string;
    pid: number;
    name: string;
  };
  language: Languages;
  result: Results;
  judge: Judge;
}
