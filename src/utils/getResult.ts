import type { SubmissionResult } from "@/types";

export const getResult = async (
  score: number,
  submissionResult: SubmissionResult,
) => {
  if (score === 100) return "AC";
  return submissionResult === "AC" ? "SS" : submissionResult;
};
