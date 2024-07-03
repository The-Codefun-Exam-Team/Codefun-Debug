import type { Decimal } from "@prisma/client/runtime/library";

import type { ScoreDisplayInfoNotNull, UserDisplayInfo } from "@/types";
import type { Judge } from "@/utils";

export interface SubmissionInfo {
  id: number;
  user: UserDisplayInfo;
  debugProblem: {
    debugProblemCode: string;
  };
  submitTime: Date;
  runtime: Decimal;
  scoreInfo: Omit<ScoreDisplayInfoNotNull, "debugSubmissionId">;
}

export interface DetailedSubmissionsInfo extends SubmissionInfo {
  debugProblem: {
    debugProblemCode: string;
    judge: Judge | string;
    language: string;
    source: string;
  };
  judge: Judge | string;
  source: string;
}
