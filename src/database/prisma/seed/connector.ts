import { PrismaClient } from "@prisma/client";

// Define separate Prisma client for seeding
export const seedPrisma = new PrismaClient();
