/*
  Warnings:

  - You are about to alter the column `score` on the `debug_submissions` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "suzume"."debug_submissions" ALTER COLUMN "score" SET DEFAULT 0,
ALTER COLUMN "score" SET DATA TYPE DECIMAL(9,2);
