import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

import prisma from "@/database/prisma/instance";

import { getUserInfo } from "./getUserInfo";

interface ProblemInfo {
  code: string;
  name: string;
  language: string;
}

export type ProblemList = ProblemInfo[];

interface ProblemInfoWithScore extends ProblemInfo {
  score: number;
  diff: number;
}

export type ProblemListWithScore = ProblemInfoWithScore[];

type returnType =
  | { ok: true; user: false; data: ProblemList }
  | { ok: true; user: true; data: ProblemListWithScore }
  | { ok: false; error: string; status: string };

export const getAllProblem = async (
  token: string | undefined,
  page: string,
  limit: string,
  language?: string,
): Promise<returnType> => {
  try {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const problems = await unstable_cache(
      async () => {
        return await prisma.debugProblems.findMany({
          where: {
            language: language,
          },
          select: {
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

    const user = await getUserInfo(token);
    if (!user.ok) {
      return {
        ok: true,
        user: false,
        data: problems satisfies ProblemList,
      };
    }
    if (problems.length === 0) {
      return { ok: true, user: true, data: [] as ProblemListWithScore };
    }
    const tid = user.user.id;
    const problemsWithScore = await unstable_cache(
      async () => {
        const score_table = await prisma.debugSubmissions.groupBy({
          by: ["dpid"],
          where: {
            tid: tid,
          },
          _max: {
            score: true,
          },
        });

        const subs_info = await prisma.debugSubmissions.findMany({
          where: {
            tid: tid,
            OR: score_table.map((problem) => {
              return {
                AND: [
                  {
                    dpid: problem.dpid,
                  },
                  {
                    score: problem._max.score ?? 0,
                  },
                ],
              };
            }),
          },
          select: {
            dpid: true,
            diff: true,
            score: true,
          },
          orderBy: {
            dpid: "asc",
          },
        });

        const problemsWithScore = problems.map((problem) => {
          return {
            ...problem,
            score: 0,
            diff: 100000,
          };
        });
        subs_info.forEach((sub) => {
          problemsWithScore[sub.dpid - 1].score = sub.score;
          problemsWithScore[sub.dpid - 1].diff = sub.diff ?? 100000;
        });

        return problemsWithScore;
      },
      [`getAllProblemWithScore-${tid}-${page}-${limit}-${language}`],
      { revalidate: 10 },
    )();
    return { ok: true, user: true, data: problemsWithScore satisfies ProblemListWithScore };
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
