import prisma from "@database/prisma/instance";
import type { DebugProblems, DebugSubmissions, SubsCode, Teams } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { getProblem } from "@/features/problems";
import type { SubmissionInfo } from "@/features/submissions";
import type { Results } from "@/types";
import { parseJudge } from "@/utils";

type ReturnType =
  | { ok: false; error: string; status: string }
  | { ok: true; data: SubmissionInfo; codetext: string };

type SqlRawSubInfo = Pick<DebugSubmissions, "score" | "result" | "submittime" | "diff"> &
  Pick<SubsCode, "code" | "error"> &
  Pick<Teams, "name" | "tid"> & {
    dp_code: DebugProblems["code"];
  };

export const getSubmission = async (sid: string): Promise<ReturnType> => {
  try {
    const drid = Number.parseInt(sid);

    if (Number.isNaN(drid)) {
      return {
        ok: false,
        error: "Submission ID is not a number.",
        status: "400",
      };
    }

    const submissionInfos = await prisma.$queryRaw<SqlRawSubInfo[]>`
      SELECT ds.score, ds.result, ds.submittime, ds.diff, sc.code, sc.error, t.name, t.tid, dp.code AS dp_code
      FROM debug_submissions ds
      JOIN teams t ON ds.tid = t.tid
      JOIN runs r ON ds.rid = r.rid
      JOIN subs_code sc ON r.rid = sc.rid
      JOIN debug_problems dp ON ds.dpid = dp.dpid
      WHERE ds.drid = ${drid}
    `;

    if (submissionInfos.length === 0) {
      return {
        ok: false,
        error: "Submission not found.",
        status: "404",
      };
    }

    const submissionInfo = submissionInfos[0];

    if (!submissionInfo.dp_code) {
      return {
        ok: false,
        error: "Problem not found.",
        status: "404",
      };
    }

    const problemInfo = await getProblem(submissionInfo.dp_code);

    const publicInfo = {
      user: {
        name: submissionInfo.name,
        tid: submissionInfo.tid,
      },
      drid: parseInt(sid),
      diff: submissionInfo.diff,
      submit_time: submissionInfo.submittime,
      debug_problem: problemInfo,
      score: submissionInfo.score,
      result: submissionInfo.result as Results,
      submission_judge: parseJudge(submissionInfo.error ?? ""),
    } satisfies SubmissionInfo;

    return {
      ok: true,
      data: publicInfo,
      codetext: submissionInfo.code,
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
