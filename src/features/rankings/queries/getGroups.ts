import prisma from "@database/prisma/instance";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

import type { GroupsData } from "../types";

export const getGroups = async (): Promise<GroupsData> => {
  try {
    return unstable_cache(
      async () => {
        const groups = prisma.groups.findMany();
        const data = await groups;
        data.push({ gid: 0, groupname: "Global" });
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
    throw "Internal Server Error";
  }
};
