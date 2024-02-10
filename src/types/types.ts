import type { CODEFUN_ROLES, COLOR_SCHEMES, LANGUAGES, RESULTS_DICT } from "./constants";

export type Languages = (typeof LANGUAGES)[number];
export type Results = keyof typeof RESULTS_DICT;

export interface UserData {
  id: number;
  username: string;
  name: string;
  group: {
    id: number;
    name: string;
  };
  status: "Admin" | "Banned" | "Normal";
  avatar: string;
  score: number;
  solved: number;
  ratio: number;
  email: string;
  rank: number;
}

export interface UserRanking {
  id: number;
  username: string;
  name: string;
  group: {
    id: number;
    name: string;
  };
  status: string;
  score: number;
  ratio: number;
  rank: number;
  avatar: string;
}

export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export type CodefunRoles = (typeof CODEFUN_ROLES)[number];
