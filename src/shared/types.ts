export type Languages = "Python2" | "Python3" | "C++" | "Nasm" | "Go" | "Java" | "Pascal";
export type Results = "AC" | "SS" | "WA" | "TLE" | "RTE" | "CE" | "MLE" | "Q" | "R" | "...";

export interface UserData {
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
}

export interface UserRanking {
  avatar: string;
  group: number;
  groupname: string;
  id: number;
  username: string;
  name: string;
  rank: number;
  points: number;
}
