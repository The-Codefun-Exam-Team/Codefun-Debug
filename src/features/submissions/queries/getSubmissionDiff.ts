import prisma from "@database/prisma/instance";
import { calcEditDistance } from "@utils/shared";

const calcSubmissionDiff = async (drid: number) => {
  const getCodeQuery = await prisma.debugSubmissions.findUniqueOrThrow({
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
  const problemCode = getCodeQuery.debug_problems.runs.subs_code.code;
  const formattedProblemCode = problemCode.replace(/\s/g, "");

  const submissionCode = getCodeQuery.runs.subs_code.code;
  const formattedSubmissionCode = submissionCode.replace(/\s/g, "");
  return await calcEditDistance(formattedProblemCode, formattedSubmissionCode);
};

const setSubmissionDiff = async (drid: number, diff: number) => {
  const updateDiffQuery = await prisma.debugSubmissions.update({
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
  return updateDiffQuery.diff;
};

export const getSubmissionDiff = async (drid: number, diff?: number) => {
  // built in checking diff
  if (diff && diff !== 1e5) {
    return diff;
  }
  const getDiffQuery = await prisma.debugSubmissions.findUniqueOrThrow({
    where: {
      drid,
    },
    select: {
      diff: true,
    },
  });
  const hasDiff = getDiffQuery.diff !== null && getDiffQuery.diff !== 100000;
  if (hasDiff) {
    return getDiffQuery.diff;
  }

  return await setSubmissionDiff(drid, await calcSubmissionDiff(drid));
};
