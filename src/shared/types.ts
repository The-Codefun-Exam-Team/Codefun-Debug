import type { CODEFUN_ROLES, COLOR_SCHEMES } from "./constants";

export enum LanguagesEnum {
  Python2,
  Python3,
  "C++",
  Nasm,
  Go,
  Java,
  Pascal,
}

export enum ResultsEnum {
  AC,
  SS,
  WA,
  TLE,
  RTE,
  CE,
  MLE,
  Q,
  R,
  "...",
}

export type Languages = keyof typeof LanguagesEnum;
export type Results = keyof typeof ResultsEnum;

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
