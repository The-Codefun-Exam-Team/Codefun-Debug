import { calcEditDistance } from "@/utils";

import { seedPrisma } from "./connector";
import { DEBUG_PROBLEMS_COUNT } from "./debugProblems";
import { USERS_COUNT } from "./users";

export const DEBUG_SUBMISSIONS_COUNT = 500;

export const seedDebugSubmissions = async () => {
  const debugSubmissions =
    await seedPrisma.debugSubmissions.createManyAndReturn({
      data: Array.from({ length: DEBUG_SUBMISSIONS_COUNT }, (_, i) => ({
        debugProblemId: (i % DEBUG_PROBLEMS_COUNT) + 1,
        userId: (i % USERS_COUNT) + 1,
        subId: 500 + i * 2 + 1,
      })),
      select: {
        id: true,
        debugProblem: {
          select: {
            submission: {
              select: {
                source: true,
              },
            },
          },
        },
        submission: {
          select: {
            source: true,
          },
        },
      },
    });
  debugSubmissions.forEach(async (debugSubmission) => {
    const debugProblemSource = debugSubmission.debugProblem.submission.source;
    const submissionSource = debugSubmission.submission.source;
    await seedPrisma.debugSubmissions.update({
      where: {
        id: debugSubmission.id,
      },
      data: {
        diff: await calcEditDistance(debugProblemSource, submissionSource),
      },
    });
  });
};
