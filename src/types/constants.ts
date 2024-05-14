import { Language, SubmissionResult } from "@prisma/client";

export const RESULTS_DICT = SubmissionResult;

Object.assign(RESULTS_DICT, {
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
});

export const LANGUAGES_DICT = Language;
Object.assign(LANGUAGES_DICT, {
  C__: "C++",
});

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
