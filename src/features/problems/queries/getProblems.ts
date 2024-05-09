import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

import type { ProblemList } from "@/features/problems";

export const getProblems = async (page: number, limit: number): Promise<ProblemList> => {
  try {
    const problems = await unstable_cache(
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
            language: problem.submission.language,
          };
        });
      },
      [`getAllProblem-${page}-${limit}`],
      { revalidate: 30 },
    )();
    return problems;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    throw new Error("Error fetching problems list");
  }
};
