import prisma from "@database/prisma/instance";
import { unstable_noStore } from "next/cache";

export const setSubmissionDiff = async (
  debugSubmissionId: number,
  diff: number,
) => {
  unstable_noStore();

  await prisma.debugSubmissions.update({
    where: {
      id: debugSubmissionId,
    },
    data: {
      diff,
    },
  });
};
