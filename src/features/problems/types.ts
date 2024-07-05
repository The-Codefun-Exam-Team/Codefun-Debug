import type { Language } from "@prisma/client";

import type { FunctionReturnType } from "@/types";
import type { Judge } from "@/utils/parseJudge";

export interface ProblemInfo {
  id: number;
  debugProblemCode: string;
  name: string;
  language: Language;
}

export type ProblemList = ProblemInfo[];

export interface DetailedProblemInfo extends ProblemInfo {
  source: string;
  statement: {
    code: string;
    name: string;
  };
  judge: Judge | string;
}

export type CreateProblemFormState = FunctionReturnType<
  {
    code: string;
    name: string;
    subId: number;
  },
  {
    codeMessages?: string[];
    nameMessages?: string[];
    submissionIdMessages?: string[];
  }
>;
