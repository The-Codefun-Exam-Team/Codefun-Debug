import prisma from "@database/prisma/instance";
import { unstable_cache } from "next/cache";

import type { ProblemList } from "@/features/problems";
import { type FunctionReturnType, LANGUAGES_DICT } from "@/types";
import { handleCatch } from "@/utils";

export const getProblems = async (
  page: number,
  limit: number,
): Promise<FunctionReturnType<ProblemList>> => {
  try {
    const data = await unstable_cache(
      async () => {
        const offset = (page - 1) * limit;
        const query = await prisma.debugProblems.findMany({
          select: {
            id: true,
            debugProblemCode: true,
            name: true,
            submission: {
              select: {
                language: true,
              },
            },
          },
          skip: offset,
          take: limit,
        });
        return query.map((problem) => {
          return {
            id: problem.id,
            debugProblemCode: problem.debugProblemCode,
            name: problem.name,
            language: LANGUAGES_DICT[problem.submission.language],
          };
        });
      },
      [`getAllProblem-${page}-${limit}`],
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
