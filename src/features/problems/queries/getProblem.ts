import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { parseJudge } from "@utils/shared";
import { unstable_cache } from "next/cache";
import { cache } from "react";

import type { DetailedProblemInfo } from "../types";

export const getProblem = async (code: string) => {
  try {
    const problemInfo = await unstable_cache(
      async () => {
        const problemInfo = await prisma.debugProblems.findUniqueOrThrow({
          where: {
            code,
          },
          select: {
            code: true,
            name: true,
            language: true,
            problem: {
              select: {
                code: true,
                name: true,
              },
            },
            runs: {
              select: {
                subs_code: {
                  select: {
                    error: true,
                    code: true,
                  },
                },
              },
            },
          },
        });

        return {
          code: problemInfo.code,
          name: problemInfo.name,
          language: problemInfo.language,
          codetext: problemInfo.runs.subs_code.code,
          problem: {
            code: problemInfo.problem.code,
            name: problemInfo.problem.name,
          },
          problem_judge: parseJudge(problemInfo.runs.subs_code.error),
        } satisfies DetailedProblemInfo;
      },
      [`getProblem-${code}`],
      { revalidate: false },
    )();

    return problemInfo;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    throw "Internal Server Error";
  }
};

export const getMemoProblem = cache(getProblem);
