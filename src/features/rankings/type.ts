import type prisma from "@database/prisma/instance";
import type { Prisma } from "@prisma/client";

export type GroupsData = Prisma.PromiseReturnType<typeof prisma.groups.findMany>;

export interface RankingsData {
  username: string;
  displayName: string;
  groupName: string;
  userStatus: string;
  score: string;
  ratio: number;
  rank: number;
  avatar: string;
}
