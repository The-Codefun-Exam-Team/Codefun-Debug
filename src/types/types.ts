import type { SubmissionResult } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

import type { CODEFUN_ROLES, COLOR_SCHEMES } from "./constants";

export type { Language, SubmissionResult, UserStatus } from "@prisma/client";

export interface UserInfo {
  id: number;
  username: string;
  name: string;
  group: {
    id: number;
    name: string;
  };
  status: string;
  avatar: string;
  score: number;
  solved: number;
  ratio: number;
  email: string;
  rank: number;
}

export interface UserDisplayInfoNormal {
  username: string;
  displayName: string;
  groupName: string;
  status: "normal" | "admin";
  score: string;
  ratio: number;
  rank: number;
  avatar: string;
}

export interface UserDisplayInfoBanned {
  username: string;
  displayName: string;
  groupName: string;
  status: "banned";
  avatar: string;
  ratio: null;
  score: null;
  rank: null;
}

export type UserDisplayInfo = UserDisplayInfoNormal | UserDisplayInfoBanned;

export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export type CodefunRoles = (typeof CODEFUN_ROLES)[number];

export interface ScoreDisplayInfoNotNull {
  score: Decimal;
  diff: number;
  result: SubmissionResult;
  debugSubmissionId?: number;
}

export type ScoreDisplayInfo = ScoreDisplayInfoNotNull | null;
