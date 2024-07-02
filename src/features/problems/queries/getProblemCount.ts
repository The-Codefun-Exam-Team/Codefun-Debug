import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

export const getProblemCount = async () => {
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
