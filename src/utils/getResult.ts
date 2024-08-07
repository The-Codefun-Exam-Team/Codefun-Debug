import type { Decimal } from "@prisma/client/runtime/library";

import type { SubmissionResult } from "@/types";

export const getResult = (
  score: Decimal,
  submissionResult: SubmissionResult,
) => {
  if (score.equals(100)) return "AC";
  return submissionResult === "AC" ? "SS" : submissionResult;
};
