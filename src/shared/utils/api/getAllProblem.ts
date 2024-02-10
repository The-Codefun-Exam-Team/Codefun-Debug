import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

import type { Languages } from "@/types";

export interface ProblemInfo {
  dpid: number;
  code: string;
  name: string;
  language: Languages;
}

export type ProblemList = ProblemInfo[];

type ReturnType = { ok: true; data: ProblemList } | { ok: false; error: string; status: string };

export const getAllProblem = async (
  page: string,
  limit: string,
  language?: Languages,
): Promise<ReturnType> => {
  try {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const problems = await unstable_cache(
      async () => {
        return await prisma.debugProblems.findMany({
          where: {
            language: language,
          },
          select: {
            dpid: true,
            code: true,
            name: true,
            language: true,
          },
          skip: offset,
          take: parseInt(limit),
        });
      },
      [`getAllProblem-${page}-${limit}-${language ?? "all"}`],
      { revalidate: 30 },
    )();
    return {
      ok: true,
      data: problems as ProblemList,
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.message);
      return { ok: false, error: e.message, status: e.code };
    } else {
      console.error(e);
      return { ok: false, error: "Internal Server Error", status: "500" };
    }
  }
};
