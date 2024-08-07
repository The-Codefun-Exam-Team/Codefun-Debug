import prisma from "@database/prisma/instance";
import { Prisma } from "@prisma/client";
import { unstable_cache, unstable_noStore } from "next/cache";

import type { GroupsData } from "@/features/rankings";

export const getGroups = async (): Promise<GroupsData> => {
  unstable_noStore();
  try {
    return unstable_cache(
      async () => {
        const groups = prisma.groups.findMany();
        const data = await groups;
        data.push({ id: 0, name: "Global" });
        data.reverse();
        return groups;
      },
      ["getGroups"],
      { revalidate: 30 },
    )();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
    } else {
      console.error(e);
    }
    throw new Error("Internal Server Error");
  }
};
