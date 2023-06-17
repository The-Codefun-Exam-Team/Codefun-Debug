import type { Results } from "./types";

export const RESULTS_DICT: Record<Results, string> = {
  AC: "Accepted",
  SS: "Partially Scored",
  WA: "Wrong Answer",
  TLE: "Time Limit Exceeded",
  RTE: "Runtime Error",
  CE: "Compile Error",
  MLE: "Memory Limit Exceeded",
  Q: "In Queue...",
  R: "To Be Rejudged...",
  "...": "Scoring...",
};
