import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { parseJudge } from "@utils/shared";
import type { Judge } from "@utils/shared/parseJudge";
import { unstable_cache } from "next/cache";

export interface DetailedProblemInfo {
  dpid: number;
  code: string;
  name: string;
  language: string;
  codetext: string;
  problem: {
    code: string;
    name: string;
  };
  problem_judge: Judge | string;
}

type ReturnType =
  | { ok: true; data: DetailedProblemInfo }
  | { ok: false; error: string; status: string };

export const getProblemInfo = async (code: string): Promise<ReturnType> => {
  try {
    const problemInfo = await unstable_cache(
      async () => {
        const problemInfo = await prisma.debugProblems.findUnique({
          where: {
            code,
          },
          select: {
            dpid: true,
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
        if (problemInfo === null) {
          return null;
        }
        if (problemInfo.runs.subs_code === null) {
          throw new Error(`Debug problem ${code} has no subs_code`);
        }
        return {
          dpid: problemInfo.dpid,
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
      [`getProblemInfo-${code}`],
      { revalidate: false },
    )();

    if (problemInfo === null) {
      return {
        ok: false,
        error: "Problem not found",
        status: "404",
      };
    }

    return {
      ok: true,
      data: problemInfo,
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.message);
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
