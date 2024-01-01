-- DropForeignKey
ALTER TABLE `debug_problems` DROP FOREIGN KEY `debug_problems_ibfk_1`;

-- DropForeignKey
ALTER TABLE `debug_submissions` DROP FOREIGN KEY `debug_submissions_ibfk_1`;

-- DropForeignKey
ALTER TABLE `debug_submissions` DROP FOREIGN KEY `debug_submissions_ibfk_2`;

-- CreateIndex
CREATE INDEX `pid` ON `debug_problems`(`pid`);

-- CreateIndex
CREATE INDEX `rid` ON `debug_submissions`(`rid`);

-- CreateIndex
CREATE INDEX `teams_group_idx` ON `teams`(`group`);
