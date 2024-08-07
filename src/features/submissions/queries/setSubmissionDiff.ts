import prisma from "@database/prisma/instance";

export const setSubmissionDiff = async (
  debugSubmissionId: number,
  diff: number,
) => {
  await prisma.debugSubmissions.update({
    where: {
      id: debugSubmissionId,
    },
    data: {
      diff,
    },
  });
};
