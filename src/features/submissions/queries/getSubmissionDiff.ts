import prisma from "@database/prisma/instance";
import { calcEditDistance } from "@utils/shared";

const calcSubmissionDiff = async (drid: number) => {
  const query = await prisma.debugSubmissions.findUniqueOrThrow({
    where: {
      drid,
    },
    select: {
      runs: {
        select: {
          subs_code: {
            select: {
              code: true,
            },
          },
        },
      },
      debug_problems: {
        select: {
          runs: {
            select: {
              subs_code: {
                select: {
                  code: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const problemCode = query.debug_problems.runs.subs_code.code;
  const formattedProblemCode = problemCode.replace(/\s/g, "");

  const submissionCode = query.runs.subs_code.code;
  const formattedSubmissionCode = submissionCode.replace(/\s/g, "");
  return await calcEditDistance(formattedProblemCode, formattedSubmissionCode);
};

const setSubmissionDiff = async (drid: number, diff: number) => {
  const query = await prisma.debugSubmissions.update({
    where: {
      drid,
    },
    data: {
      diff,
    },
    select: {
      diff: true,
    },
  });
  return query.diff;
};

export const getSubmissionDiff = async (drid: number) => {
  const hasDiffQuery = await prisma.debugSubmissions.findUniqueOrThrow({
    where: {
      drid,
    },
    select: {
      diff: true,
    },
  });
  const hasDiff = hasDiffQuery.diff !== null && hasDiffQuery.diff !== 100000;
  if (hasDiff) {
    return hasDiffQuery.diff;
  }

  return await setSubmissionDiff(drid, await calcSubmissionDiff(drid));
};
