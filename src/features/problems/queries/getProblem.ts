import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";
import { cache } from "react";

import type { DetailedProblemInfo } from "@/features/problems";
import { LANGUAGES_DICT } from "@/types";
import { parseJudge } from "@/utils";

export const getProblem = async (code: string): Promise<DetailedProblemInfo> => {
  try {
    return await unstable_cache(
      async () => {
        const query = await prisma.debugProblems.findUniqueOrThrow({
          where: {
            debugProblemCode: code,
          },
          select: {
            id: true,
            debugProblemCode: true,
            name: true,
            submission: {
              select: {
                language: true,
                source: true,
                problem: {
                  select: {
                    problemCode: true,
                    name: true,
                  },
                },
                judgeOutput: true,
              },
            },
          },
        });
        return {
          id: query.id,
          debugProblemCode: query.debugProblemCode,
          name: query.name,
          language: LANGUAGES_DICT[query.submission.language],
          source: query.submission.source,
          statement: {
            code: query.submission.problem.problemCode,
            name: query.submission.problem.name,
          },
          problemJudge: parseJudge(
            query.submission.judgeOutput ??
              "Submission in queue when added, please report to teacher.",
          ),
        };
      },
      [`getProblem-${code}`],
      { revalidate: false },
    )();
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    throw new Error("Internal Server Error");
  }
};

export const getMemoProblem = cache(getProblem);
