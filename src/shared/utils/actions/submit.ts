"use server";
import prisma from "@database/prisma/instance";
import { type DebugProblems, type DebugSubmissions, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getUserInfo } from "@utils/api";
import { calcEditDistance } from "@utils/shared";
import { cookies } from "next/headers";

export const recalcScore = async (
  dpid: DebugSubmissions["dpid"],
  mindiff?: DebugProblems["mindiff"],
) => {
  try {
    if (mindiff === undefined) {
      mindiff =
        (
          await prisma.debugSubmissions.groupBy({
            by: ["dpid"],
            where: {
              dpid,
              result: "AC",
            },
            _min: {
              diff: true,
            },
          })
        )[0]._min.diff ?? 100000;
    }
    const typedMindiff = mindiff as number;

    const problemScore = (
      await prisma.debugProblems
        .findUniqueOrThrow({
          where: {
            dpid,
          },
        })
        .runs({
          select: {
            score: true,
          },
        })
    ).score;

    await prisma.debugProblems.update({
      where: {
        dpid,
      },
      data: {
        mindiff,
      },
    });

    const results = await prisma.debugSubmissions.findMany({
      where: {
        dpid,
      },
      select: {
        drid: true,
        diff: true,
        result: true,
        runs: {
          select: {
            score: true,
          },
        },
      },
    });

    const newDataPromise = results.map(async (result) => {
      const increasedScore = Math.max(0, result.runs.score - problemScore);
      const scorePercentage = increasedScore / (100 - problemScore);
      // minus 5% score for each addition diff
      if (result.diff === null || result.diff === 100000) {
        result.diff = (
          await prisma.debugSubmissions.update({
            where: {
              drid: result.drid,
            },
            data: {
              diff: await calcSubmissionDiff(result.drid),
            },
            select: {
              diff: true,
            },
          })
        ).diff;
      }
      const typedDiff = result.diff as number;
      const diffPercentage =
        typedDiff < typedMindiff ? 1 : Math.max(0, 1 - ((typedDiff - typedMindiff) * 5) / 100);
      const newScore = scorePercentage * diffPercentage * 100;
      return {
        drid: result.drid,
        score: newScore,
        result:
          Math.abs(result.runs.score - 100) < 1e-5
            ? "AC"
            : result.result === "AC"
              ? "SS"
              : result.result,
      };
    });

    const newData = await Promise.all(newDataPromise);
    const dataPayload = newData.map(
      (data) => Prisma.sql`(${data.drid}, ${data.score}, ${data.result})`,
    );

    await prisma.$queryRaw`
      INSERT IGNORE INTO debug_submissions (drid,score,result)
        VALUES ${Prisma.join(dataPayload)}
      ON DUPLICATE KEY UPDATE
        score = VALUES(score), result = VALUES(result)
    `;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
    } else {
      console.error(e);
    }
  }
};

const calcScore = async (drid: DebugSubmissions["drid"]) => {
  try {
    const diffQuery = await prisma.debugSubmissions.findUniqueOrThrow({
      where: {
        drid,
      },
      select: {
        diff: true,
      },
    });

    const diff =
      diffQuery.diff === null || diffQuery.diff === 100000
        ? ((
            await prisma.debugSubmissions.update({
              where: {
                drid,
              },
              data: {
                diff: await calcSubmissionDiff(drid),
              },
              select: {
                diff: true,
              },
            })
          ).diff as number)
        : diffQuery.diff;

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
        void recalcScore(dpid, diff);
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

const calcSubmissionDiff = async (drid: number) => {
  const problemCode = (
    await prisma.debugSubmissions
      .findUniqueOrThrow({
        where: {
          drid,
        },
      })
      .debug_problems()
      .runs()
      .subs_code({ select: { code: true } })
  ).code.replace(/\s/g, "");

  if (problemCode === undefined) {
    throw new Error(`Submission ${drid} has no problem_code`);
  }

  const submissionCode = (
    await prisma.debugSubmissions
      .findUniqueOrThrow({
        where: {
          drid,
        },
      })
      .runs()
      .subs_code({ select: { code: true } })
  ).code.replace(/\s/g, "");

  if (submissionCode === undefined) {
    throw new Error(`Submission ${drid} has no submission_code`);
  }

  const editDistance = await calcEditDistance(problemCode, submissionCode);

  await prisma.debugSubmissions.update({
    where: {
      drid,
    },
    data: {
      diff: editDistance,
    },
  });

  return editDistance;
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
    const userRes = await getUserInfo(token.value);
    if (!userRes.ok) {
      return {
        ok: false,
        status: userRes.status,
        message: userRes.error,
      };
    }
    const user = userRes.user;
    const codefunProblem = await prisma.debugProblems.findUnique({
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
