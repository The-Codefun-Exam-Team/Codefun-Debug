import type { Judge } from "@utils/shared/parseJudge";

import type { Languages } from "@/types";

export interface ProblemInfo {
  dpid: number;
  code: string;
  name: string;
  language: Languages;
}

export type ProblemList = ProblemInfo[];

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
