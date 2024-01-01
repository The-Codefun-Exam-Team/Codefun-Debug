import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

export const getProblemCount = async (): Promise<
  { ok: true; count: number } | { ok: false; error: string; status: string }
> => {
  try {
    const count = await unstable_cache(
      async () => {
        return await prisma.debugProblems.count();
      },
      ["getProblemCount"],
      { revalidate: 30 },
    )();
    return {
      ok: true,
      count,
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e);
      return {
        ok: false,
        error: e.message,
        status: e.code,
      };
    } else {
      console.error(e);
      return {
        ok: false,
        error: "Internal Server Error",
        status: "500",
      };
    }
  }
};
