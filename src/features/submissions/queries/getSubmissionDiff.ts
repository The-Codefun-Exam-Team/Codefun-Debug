import prisma from "@database/prisma/instance";

import { calcEditDistance } from "@/utils";

const cppFormat = (code: string) => {
  return code.replace(/\s/g, "");
};

const calcSubmissionDiff = async (id: number) => {
  const getCodeQuery = await prisma.debugSubmissions.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      submissions: {
        select: {
          source: true,
        },
      },
      debugProblems: {
        select: {
          submissions: {
            select: {
              source: true,
            },
          },
        },
      },
    },
  });
  const problemCode = getCodeQuery.debugProblems.submissions.source;
  const formattedProblemCode = cppFormat(problemCode);

  const submissionCode = getCodeQuery.submissions.source;
  const formattedSubmissionCode = cppFormat(submissionCode);
  return await calcEditDistance(formattedProblemCode, formattedSubmissionCode);
};

const setSubmissionDiff = async (id: number, diff: number) => {
  const updateDiffQuery = await prisma.debugSubmissions.update({
    where: {
      id,
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

export const getSubmissionDiff = async (id: number) => {
  const getDiffQuery = await prisma.debugSubmissions.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      diff: true,
    },
  });
  const isCalculated = getDiffQuery.diff !== 32000;
  if (isCalculated) {
    return getDiffQuery.diff;
  }
  const diff = await calcSubmissionDiff(id);
  void setSubmissionDiff(id, diff);
  return diff;
};
