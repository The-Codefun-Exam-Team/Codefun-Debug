import type { Language } from "@prisma/client";

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
