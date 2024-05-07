import type prisma from "@database/prisma/instance";
import type { Prisma } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export type GroupsData = Prisma.PromiseReturnType<typeof prisma.groups.findMany>;

export interface RankingsData {
  username: string;
  display_name: string;
  group_name: string;
  user_status: string;
  score: Decimal;
  ratio: number;
  rank: number;
  avatar: string;
}
