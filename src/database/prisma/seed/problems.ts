import prisma from "../instance";

export const PROBLEMS_COUNT = 10;

export const seedProblems = async () => {
  await prisma.problems.createMany({
    data: Array.from({ length: PROBLEMS_COUNT }, (_, i) => ({
      setterId: 1,
      problemCode: `P${(i + 1).toString().padStart(3, "0")}`,
      name: `Problem ${i + 1}`,
      scoreType: "acm",
      problemGroup: "Group 1",
      statements: "This is a problem statement",
      timeLimit: 1,
      score: 100,
      solvedCount: 0,
      totalAttempts: 0,
    })),
  });
};
