import { seedPrisma } from "./connector";

export const DEBUG_PROBLEMS_COUNT = 100;

export const seedDebugProblems = async () => {
  await seedPrisma.debugProblems.createMany({
    data: Array.from({ length: DEBUG_PROBLEMS_COUNT }, (_, i) => ({
      debugProblemCode: `D${(i + 1).toString().padStart(3, "0")}`,
      name: `Debug Problem ${i + 1}`,
      subId: (i + 1) * 2,
    })),
  });
};
