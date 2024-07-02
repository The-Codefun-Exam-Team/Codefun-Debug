import type prisma from "@database/prisma/instance";
import type { Prisma } from "@prisma/client";

import type { UserDisplayInfo } from "@/types";

export type GroupsData = Prisma.PromiseReturnType<typeof prisma.groups.findMany>;

export type RankingsData = UserDisplayInfo[];
