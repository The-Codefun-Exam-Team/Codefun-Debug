import prisma from "@database/prisma/instance";
import { unstable_cache } from "next/cache";

import type { FunctionReturnType } from "@/types";
import { handleCatch } from "@/utils";

export const getProblemCount = async (): Promise<
  FunctionReturnType<number>
> => {
  try {
    const data = await unstable_cache(
      async () => {
        return await prisma.debugProblems.count();
      },
      ["getProblemCount"],
      { revalidate: 30 },
    )();
    return {
      ok: true,
      data: data,
    };
  } catch (e) {
    return handleCatch(e);
  }
};
