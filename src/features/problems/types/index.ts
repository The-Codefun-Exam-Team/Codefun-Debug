import type { Judge } from "@utils/shared/parseJudge";

export interface DetailedProblemInfo {
  code: string;
  name: string;
  language: string;
  codetext: string;
  problem: {
    code: string;
    name: string;
  };
  problem_judge: Judge | string;
}
