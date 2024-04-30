import type { SubmissionResult, UserStatus } from "@prisma/client";

import type { CODEFUN_ROLES, COLOR_SCHEMES } from "./constants";

export type { Language, SubmissionResult, UserStatus } from "@prisma/client";

export interface UserData {
  id: number;
  username: string;
  name: string;
  group: {
    id: number;
    name: string;
  };
  status: UserStatus;
  avatar: string;
  score: number;
  solved: number;
  ratio: number;
  email: string;
  rank: number;
}

export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export type CodefunRoles = (typeof CODEFUN_ROLES)[number];

interface DetailedScoreInfoNotNull {
  score: number;
  diff: number | null;
  result: SubmissionResult;
  drid: number;
}

interface DetailedScoreInfoNull {
  score: 0;
  diff: null;
  result: null;
  drid: null;
}

export type DetailedScoreInfo = DetailedScoreInfoNotNull | DetailedScoreInfoNull;
