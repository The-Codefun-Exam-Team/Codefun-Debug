/*
  Warnings:

  - Made the column `diff` on table `debug_submissions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `debug_problems` MODIFY `mindiff` INTEGER NOT NULL DEFAULT 100000;

-- AlterTable
ALTER TABLE `debug_submissions` MODIFY `diff` INTEGER NOT NULL DEFAULT 100000;
