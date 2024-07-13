import { seedPrisma } from "./connector";

export const GROUPS_COUNT = 20;

export const seedGroups = async () => {
  await seedPrisma.groups.createMany({
    data: Array.from({ length: GROUPS_COUNT }, (_, i) => ({
      name: `Group ${i + 1}`,
    })),
  });
};
