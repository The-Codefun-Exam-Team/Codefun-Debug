import prisma from "@database/prisma/instance";
import { type DebugProblems, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { getSubmissionDiff } from "@/features/submissions";

export const recalcProblemScore = async (
  code: DebugProblems["code"],
  mindiff?: DebugProblems["mindiff"],
) => {
  try {
    if (mindiff === undefined) {
      mindiff =
        (
          await prisma.debugSubmissions.groupBy({
            by: ["dpid"],
            where: {
              code,
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
            code,
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
        code,
      },
      data: {
        mindiff,
      },
    });

    const results = await prisma.debugSubmissions.findMany({
      where: {
        code,
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
      result.diff = await getSubmissionDiff(result.drid, result.diff);
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
