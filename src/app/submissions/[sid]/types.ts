import type { Languages, Results, UserData } from "@/shared/types";

export interface SubmissionsData {
  debug_problem_code: string;
  result: Results;
  score: number;
  rid: number;
}

export interface RunData {
  id: number;
  problem: {
    id: number;
    code: string;
    name: string;
  };
  owner: UserData;
  language: Languages;
  result: Results;
  running_time: number;
  submitTime: number;
  isScored: boolean;
  score: number;
  judge?:
    | {
        correct: number;
        total: number;
        tests: {
          verdict: Results;
          runningTime: number;
          message: string;
        }[];
      }
    | string;
  code: string;
}
