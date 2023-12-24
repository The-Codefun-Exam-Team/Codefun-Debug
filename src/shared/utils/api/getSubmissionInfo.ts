import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { parseJudge } from "@utils/shared";
import type { Judge } from "@utils/shared/parseJudge";

import type { Results } from "@/shared/types";

import type { DetailedProblemInfo } from "./getProblemInfo";
import { getProblemInfo } from "./getProblemInfo";

export interface SubmissionInfo {
  user: {
    name: string;
    tid: number;
  };
  drid: number;
  diff: number | null;
  submit_time: number;
  debug_problem: DetailedProblemInfo;
  score: number;
  result: Results;
  submission_judge: Judge | string;
}

type ReturnType =
  | { ok: false; error: string; status: string }
  | { ok: true; data: SubmissionInfo; codetext: string };

export const getSubmissionInfo = async (sid: string): Promise<ReturnType> => {
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
        error: "Submission not found.",
        status: "404",
      };
    }

    const problemInfo = await getProblemInfo(submissionInfo.debug_problems.code);

    if (!problemInfo.ok) {
      console.error(problemInfo.error);
      return {
        ok: false,
        error: "Internal Server Error",
        status: "500",
      };
    }

    if (submissionInfo.runs.subs_code === null) {
      throw new Error(`Submission ${sid} has no subs_code`);
    }

    const publicInfo = {
      user: {
        name: submissionInfo.teams.name,
        tid: submissionInfo.teams.tid,
      },
      drid: parseInt(sid),
      diff: submissionInfo.diff,
      submit_time: submissionInfo.submittime,
      debug_problem: problemInfo.data,
      score: submissionInfo.score,
      result: submissionInfo.result as Results,
      submission_judge: parseJudge(submissionInfo.runs.subs_code.error),
    } satisfies SubmissionInfo;
    return {
      ok: true,
      data: publicInfo,
      codetext: submissionInfo.runs.subs_code.code,
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
      return {
        ok: false,
        error: "Internal Server Error",
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
