import prisma from "../instance";

export const GROUPS_COUNT = 20;

export const seedGroups = async () => {
  await prisma.groups.createMany({
    data: Array.from({ length: GROUPS_COUNT }, (_, i) => ({
      name: `Group ${i + 1}`,
    })),
  });
};
