import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

import prisma from "@/database/prisma/instance";
import type { Languages, Results } from "@/shared/types";

import { getUserInfo } from "./getUserInfo";

interface ProblemInfo {
  dpid: number;
  code: string;
  name: string;
  language: Languages;
}

export type ProblemList = ProblemInfo[];

export interface ScoreInfoNotNull {
  score: number;
  diff: number | null;
  result: Results;
  drid: number;
}

export interface ScoreInfoNull {
  score: 0;
  diff: null;
  result: null;
  drid: null;
}

export type ScoreInfo = ScoreInfoNotNull | ScoreInfoNull;

export type ProblemInfoWithScore = ProblemInfo & ScoreInfo;

export type ProblemListWithScore = ProblemInfoWithScore[];

type ReturnType =
  | { ok: true; user: false; data: ProblemList }
  | { ok: true; user: true; data: ProblemListWithScore }
  | { ok: false; error: string; status: string };

export const getAllProblem = async (
  token: string | undefined,
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

    const user = await getUserInfo(token);
    if (!user.ok || !token) {
      return {
        ok: true,
        user: false,
        data: problems as ProblemList,
      };
    }
    if (problems.length === 0) {
      return { ok: true, user: true, data: [] as ProblemListWithScore };
    }
    const tid = user.user.id;
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
        result: true,
        drid: true,
      },
      orderBy: {
        dpid: "asc",
      },
    });

    const problemsWithScore = problems.map((problem) => {
      return {
        ...problem,
        score: 0,
        diff: null,
        result: null,
        drid: null,
      } as ProblemInfoWithScore;
    });
    let index = 0;
    subs_info.forEach((sub) => {
      while (problemsWithScore[index].dpid < sub.dpid) {
        index++;
      }
      if (problemsWithScore[index].dpid === sub.dpid) {
        problemsWithScore[index] = { ...problemsWithScore[index], ...sub } as ProblemInfoWithScore;
      }
    });
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
