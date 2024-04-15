import type prisma from "@database/prisma/instance";
import type { Prisma } from "@prisma/client";

export type GroupsData = Prisma.PromiseReturnType<typeof prisma.groups.findMany>;

export interface RankingsData {
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
