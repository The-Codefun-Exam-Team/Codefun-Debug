import type { Languages, Results } from "@/shared/types";

export interface DebugProblemBrief {
  code: string;
  name: string;
  best_score: number;
  language: Languages;
  result: Results;
}
