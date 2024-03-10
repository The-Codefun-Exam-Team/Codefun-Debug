"use server";
import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";

import { getUser } from "@/features/auth";
import { recalcProblemScore } from "@/features/problems";
import { getSubmissionDiff } from "@/features/submissions";

const calcScore = async (drid: number) => {
  try {
    const diff = await getSubmissionDiff(drid);

    const mindiff = (
      await prisma.debugSubmissions
        .findUniqueOrThrow({
          where: {
            drid,
          },
        })
        .debug_problems({
          select: {
            mindiff: true,
          },
        })
    ).mindiff;

    const codefunRunInfo = await prisma.debugSubmissions
      .findUniqueOrThrow({
        where: {
          drid,
        },
      })
      .debug_problems()
      .runs({
        select: {
          result: true,
          score: true,
        },
      });

    const dpid = (
      await prisma.debugSubmissions.findFirstOrThrow({
        where: {
          drid,
        },
        select: {
          dpid: true,
        },
      })
    ).dpid;

    if (codefunRunInfo.result === "AC") {
      if (diff < mindiff) {
        void recalcProblemScore(dpid, diff);
      }
    }

    const debugSubmissionsQuery = async (): Promise<{ result: string; score: number }> => {
      return new Promise((resolve) => {
        const interval = setInterval(async () => {
          const debugSubmissionsInfo = await prisma.debugSubmissions
            .findUniqueOrThrow({
              where: {
                drid,
              },
            })
            .runs({
              select: {
                result: true,
                score: true,
              },
            });
          if (debugSubmissionsInfo.result !== "Q") {
            clearInterval(interval);
            resolve(debugSubmissionsInfo);
          }
        }, 1000);
      });
    };

    const debugSubmissionsInfo = await debugSubmissionsQuery();

    const initialScore = codefunRunInfo.score;
    const submissionsScore = debugSubmissionsInfo.score;
    const increasedScore = Math.max(0, submissionsScore - initialScore);
    const scorePercentage = increasedScore / (100 - initialScore);
    // minus 5% score for each addition diff
    const diffPercentage = diff < mindiff ? 1 : Math.max(0, 1 - ((diff - mindiff) * 5) / 100);
    const newScore = scorePercentage * diffPercentage * 100;

    if (Math.abs(newScore - 100) < 1e-5) {
      await prisma.debugSubmissions.update({
        where: {
          drid,
        },
        data: {
          result: "AC",
          score: 100,
        },
      });
    } else if (codefunRunInfo.result === "AC") {
      await prisma.debugSubmissions.update({
        where: {
          drid,
        },
        data: {
          result: "SS",
          score: newScore,
        },
      });
    } else {
      await prisma.debugSubmissions.update({
        where: {
          drid,
        },
        data: {
          result: codefunRunInfo.result,
          score: newScore,
        },
      });
    }
  } catch (e) {
    console.error(`Error calculating score for submission ${drid}`, e);
  }
};

export const submit = async (
  code: string,
  codetext: string,
): Promise<{ ok: true; drid: number } | { ok: false; status: number; message: string }> => {
  try {
    const token = cookies().get("token");
    if (!token) {
      return {
        ok: false,
        status: 401,
        message: "Unauthorized",
      };
    }
    const userRes = await getUser(token.value);
    if (!userRes.ok) {
      return {
        ok: false,
        status: userRes.status,
        message: userRes.error,
      };
    }
    const user = userRes.user;
    const codefunProblem = await prisma.debugProblems.findUniqueOrThrow({
      where: {
        code,
      },
      select: {
        dpid: true,
        problem: {
          select: {
            pid: true,
          },
        },
        language: true,
      },
    });
    if (!codefunProblem) {
      return {
        ok: false,
        status: 404,
        message: "Problem not found",
      };
    }

    const submissionToCodefun = await fetch("https://codefun.vn/api/submit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        problem: codefunProblem.problem.pid.toString(),
        language: codefunProblem.language,
        code: codetext,
      }),
    });

    const submissionToCodefunJson = await submissionToCodefun.json();

    if (!submissionToCodefun.ok) {
      console.error(submissionToCodefunJson.error);
      return {
        ok: false,
        status: submissionToCodefun.status,
        message: submissionToCodefunJson.error,
      };
    }

    const submissionId = submissionToCodefunJson.data as number;

    const submissionInfo = await prisma.runs.findUniqueOrThrow({
      where: {
        rid: submissionId,
      },
      select: {
        submittime: true,
        result: true,
        score: true,
        subs_code: {
          select: {
            code: true,
            error: true,
          },
        },
      },
    });

    const submission = await prisma.debugSubmissions.create({
      data: {
        rid: submissionId,
        tid: user.id,
        dpid: codefunProblem.dpid,
        language: codefunProblem.language,
        submittime: submissionInfo.submittime,
        result: "Q",
        score: 0,
        code: codetext,
      },
      select: {
        drid: true,
      },
    });

    void calcScore(submission.drid);

    return {
      ok: true,
      drid: submission.drid,
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e);
      return {
        ok: false,
        status: parseInt(e.code),
        message: e.message,
      };
    } else {
      console.error(e);
      return {
        ok: false,
        status: 500,
        message: "An internal server error occurred.",
      };
    }
  }
};
