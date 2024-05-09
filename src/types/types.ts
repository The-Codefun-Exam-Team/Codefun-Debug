import type { SubmissionResult, UserStatus } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

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

interface DetailedScoreNotNull {
  score: Decimal;
  diff: number;
  result: SubmissionResult;
  subId: number;
}

export type DetailedScoreInfo = DetailedScoreNotNull | null;
