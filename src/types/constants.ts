import type { SubmissionResult } from "@prisma/client";
import { Language } from "@prisma/client";

export const RESULTS_DICT = {
  AC: "Accepted",
  SS: "Partially Scored",
  WA: "Wrong Answer",
  TLE: "Time Limit Exceeded",
  RTE: "Runtime Error",
  CE: "Compile Error",
  MLE: "Memory Limit Exceeded",
  Q: "In Queue...",
  Scoring: "Scoring...",
  TO: "Time Out",
  DQ: "Disqualified",
} satisfies { [T in SubmissionResult]: string };

export const LANGUAGES_DICT = {
  ...Language,
  C__: "C++" as const,
} satisfies { [T in Language]: string };

export const CODEFUN_ROLES = [
  "newbie",
  "beginner",
  "novice",
  "coder",
  "expert",
  "master",
  "hacker",
  "grandmaster",
  "banned",
  "problemsetter",
  "admin",
  "mod",
] as const;

export const COLOR_SCHEMES = ["dark", "light"] as const;
