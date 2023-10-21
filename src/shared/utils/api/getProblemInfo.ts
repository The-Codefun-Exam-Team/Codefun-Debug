import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache } from "next/cache";

import prisma from "@/database/prisma/instance";
import type { Results } from "@/shared/types";

import { getUserInfo } from "./getUserInfo";

export interface DetailedProblemInfo {
  code: string;
  name: string;
  language: string;
  problem: {
    code: string;
    name: string;
  };
}

export interface DetailedScoreInfoNotNull {
  score: number;
  diff: number | null;
  result: Results;
  drid: number;
  judge:
    | {
        correct: number;
        total: number;
        tests: [verdict: Results, runningTime: number, messages: string];
      }
    | string;
}

export interface DetailedScoreInfoNull {
  score: 0;
  diff: null;
  result: null;
  drid: null;
  judge: null;
}

export type DetailedScoreInfo = DetailedScoreInfoNotNull | DetailedScoreInfoNull;

export type DetailedProblemInfoWithScore = DetailedProblemInfo & DetailedScoreInfo;

type ReturnType =
  | { ok: true; user: false; data: DetailedProblemInfo }
  | { ok: true; user: true; data: DetailedProblemInfoWithScore }
  | { ok: false; error: string; status: string };

export const getProblemInfo = async (
  code: string,
  token: string | undefined,
): Promise<ReturnType> => {
  try {
    const problemInfo = await unstable_cache(
      async () => {
        const problemInfo = await prisma.debugProblems.findUnique({
          where: {
            code: code,
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
          },
        });
        return problemInfo;
      },
      [`get-problem-info-${code}`],
      { revalidate: false },
    )();

    if (problemInfo === null) {
      return {
        ok: false,
        error: "Problem not found",
        status: "404",
      };
    }

    const user = await getUserInfo(token);
    if (!user.ok) {
      return {
        ok: true,
        user: false,
        data: problemInfo,
      };
    }
    const tid = user.user.id;

    const scoreInfo = await prisma.debugSubmissions.groupBy({
      by: ["dpid"],
      where: {
        tid: tid,
        debug_problems: {
          code: code,
        },
      },
      _max: {
        score: true,
      },
    });

    const runInfo = await prisma.debugSubmissions.findMany({
      where: {
        tid: tid,
        debug_problems: {
          code: code,
        },
        score: scoreInfo[0]._max.score ?? 0,
      },
      select: {
        drid: true,
        score: true,
        diff: true,
        result: true,
        runs: {
          select: {
            subs_code: {
              select: {
                error: true,
              },
            },
          },
        },
      },
    });

    const problemInfoWithScore = {
      ...problemInfo,
      score: runInfo[0].score,
      diff: runInfo[0].diff,
      result: runInfo[0].result as Results,
      judge: runInfo[0].runs.subs_code.error,
      drid: runInfo[0].drid,
    } as DetailedProblemInfoWithScore;

    return {
      ok: true,
      user: true,
      data: problemInfoWithScore,
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
