import type { Prisma } from "@prisma/client";

import type prisma from "@/database/prisma/instance";
import type { UserRanking } from "@/shared/types";

export type { UserRanking };

export type RankingsData = UserRanking[];

export type GroupsData = Prisma.PromiseReturnType<typeof prisma.groups.findMany>;
