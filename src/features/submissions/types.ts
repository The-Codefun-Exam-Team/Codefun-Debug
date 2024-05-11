import type { DetailedProblemInfo } from "@/features/problems";
import type { Results } from "@/types";
import type { Judge } from "@/utils";

export interface SubmissionInfo {
  user: {
    name: string;
    tid: number;
  };
  drid: number;
  diff: number | null;
  submit_time: number;
  debug_problem: DetailedProblemInfo;
  score: number;
  result: Results;
  submission_judge: Judge | string;
}
