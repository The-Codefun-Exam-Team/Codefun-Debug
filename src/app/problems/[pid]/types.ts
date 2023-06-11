import type { Languages, Results } from "@/shared/types";

interface Judge {
  correct: number;
  total: number;
  tests: Array<{
    verdict: Results;
    runningTime: number;
    message: string;
  }>;
}

export interface ProblemData {
  best_score: number;
  code: string;
  problem: {
    code: string;
    id: number;
    name: string;
  };
  language: Languages;
  result: Results;
  judge: Judge;
}
