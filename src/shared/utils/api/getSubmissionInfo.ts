import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { type Judge, parseJudge } from "@utils/shared/parseJudge";

import prisma from "@/database/prisma/instance";
import type { Results } from "@/shared/types";

import type { DetailedProblemInfo } from "./getProblemInfo";
import { getProblemInfo } from "./getProblemInfo";
import { getUserInfo } from "./getUserInfo";

export interface PublicSubmissionInfo {
  user: {
    name: string;
  };
  sid: number;
  diff: number | null;
  sumbmitTime: number;
  debug_problem: DetailedProblemInfo;
  score: number;
  result: Results;
  submission_judge: Judge | string;
}

export interface PrivateSubmissionInfo extends PublicSubmissionInfo {
  codetext: string;
}

type ReturnType =
  | { ok: false; error: string; status: string }
  | { ok: true; access: false; data: PublicSubmissionInfo }
  | { ok: true; access: true; data: PrivateSubmissionInfo };

export const getSubmissionInfo = async (sid: string, token?: string): Promise<ReturnType> => {
  try {
    const submissionInfo = await prisma.debugSubmissions.findUnique({
      where: {
        drid: parseInt(sid),
      },
      select: {
        teams: {
          select: {
            name: true,
            tid: true,
          },
        },
        score: true,
        result: true,
        submittime: true,
        diff: true,
        debug_problems: {
          select: {
            code: true,
          },
        },
        runs: {
          select: {
            subs_code: {
              select: {
                code: true,
                error: true,
              },
            },
          },
        },
      },
    });

    if (submissionInfo === null) {
      return {
        ok: false,
        error: "Submission not found",
        status: "404",
      };
    }

    const problemInfo = await getProblemInfo(submissionInfo.debug_problems.code, token);

    if (!problemInfo.ok) {
      throw new Error(
        `Fetching problem ${submissionInfo.debug_problems.code} for submission ${sid} failed`,
      );
    }

    if (submissionInfo.runs.subs_code === null) {
      throw new Error(`Submission ${sid} has no subs_code`);
    }

    const publicInfo = {
      user: {
        name: submissionInfo.teams.name,
      },
      sid: parseInt(sid),
      diff: submissionInfo.diff,
      sumbmitTime: submissionInfo.submittime,
      debug_problem: problemInfo.data,
      score: submissionInfo.score,
      result: submissionInfo.result as Results,
      submission_judge: parseJudge(submissionInfo.runs.subs_code.error),
    } satisfies PublicSubmissionInfo;

    const userInfo = await getUserInfo(token);
    if (!userInfo.ok) {
      return {
        ok: true,
        access: false,
        data: publicInfo,
      };
    }
    if (userInfo.user.id !== submissionInfo.teams.tid && userInfo.user.status !== "Admin") {
      return {
        ok: true,
        access: false,
        data: publicInfo,
      };
    }

    return {
      ok: true,
      access: true,
      data: {
        ...publicInfo,
        codetext: submissionInfo.runs.subs_code.code,
      } satisfies PrivateSubmissionInfo,
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
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
