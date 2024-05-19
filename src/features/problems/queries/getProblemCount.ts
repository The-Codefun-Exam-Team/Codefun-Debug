import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache, unstable_noStore } from "next/cache";

export const getProblemCount = async () => {
  unstable_noStore();
  try {
    return await unstable_cache(
      async () => {
        return await prisma.debugProblems.count();
      },
      ["getProblemCount"],
      { revalidate: 30 },
    )();
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e);
    } else {
      console.error(e);
    }
    throw new Error("Error fetching problem count");
  }
};
