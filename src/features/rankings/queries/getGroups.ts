import prisma from "@database/prisma/instance";
import { unstable_cache, unstable_noStore } from "next/cache";

import type { GroupsData } from "@/features/rankings";
import type { FunctionReturnType } from "@/types";
import { handleCatch } from "@/utils";

export const getGroups = async (): Promise<FunctionReturnType<GroupsData>> => {
  unstable_noStore();
  try {
    return await unstable_cache(
      async () => {
        const data = await prisma.groups.findMany();
        data.push({ id: 0, name: "Global" });
        data.reverse();
        return {
          ok: true,
          data: data,
        } satisfies { ok: true; data: GroupsData };
      },
      ["getGroups"],
      { revalidate: 30 },
    )();
  } catch (e) {
    return handleCatch(e);
  }
};
