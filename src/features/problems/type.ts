import type { Languages } from "@/types";
import type { Judge } from "@/utils/parseJudge";

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
