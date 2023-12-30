-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `variable` TINYTEXT NULL,
    `value` LONGTEXT NULL,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blogid` INTEGER NOT NULL,
    `tid` INTEGER NOT NULL,
    `time` INTEGER NOT NULL DEFAULT (current_timestamp()),
    `parent` INTEGER NOT NULL DEFAULT 0,
    `content` LONGTEXT NOT NULL,
    `access` TEXT NOT NULL DEFAULT '',

    INDEX `blogid`(`blogid` ASC, `tid` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `tid` INTEGER NOT NULL,
    `time` INTEGER NOT NULL DEFAULT (current_timestamp()),
    `content` LONGTEXT NOT NULL,
    `access` TEXT NOT NULL DEFAULT '',
    `official` BOOLEAN NOT NULL DEFAULT false,

    INDEX `tid`(`tid` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `broadcast` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TINYTEXT NOT NULL,
    `msg` TEXT NOT NULL,
    `createdOn` DATETIME(0) NOT NULL,
    `updatedOn` DATETIME(0) NOT NULL,
    `deleted` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clar` (
    `time` INTEGER NOT NULL,
    `tid` INTEGER NULL,
    `pid` INTEGER NULL,
    `query` TEXT NULL,
    `reply` TEXT NULL,
    `access` TINYTEXT NULL,
    `createtime` INTEGER NULL,

    PRIMARY KEY (`time` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` TINYTEXT NOT NULL,
    `name` TEXT NOT NULL,
    `starttime` INTEGER NOT NULL,
    `endtime` INTEGER NOT NULL,
    `announcement` TEXT NOT NULL,
    `ranktable` TEXT NULL,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest_hacks` (
    `hid` INTEGER NOT NULL AUTO_INCREMENT,
    `tid` INTEGER NOT NULL,
    `cid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL,
    `subtime` INTEGER NOT NULL,
    `input` LONGTEXT NOT NULL,
    `result` TEXT NOT NULL,
    `score` DOUBLE NOT NULL,

    INDEX `tid`(`tid` ASC, `cid` ASC, `pid` ASC),
    PRIMARY KEY (`hid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest_problems_bak` (
    `pid` INTEGER NOT NULL AUTO_INCREMENT,
    `cid` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `name` TEXT NOT NULL,
    `shortname` TEXT NOT NULL,
    `pdesc` LONGTEXT NOT NULL,
    `timelimit` DOUBLE NOT NULL,
    `score` INTEGER NOT NULL,

    INDEX `cid`(`cid` ASC),
    INDEX `cid_2`(`cid` ASC),
    UNIQUE INDEX `pid`(`pid` ASC),
    PRIMARY KEY (`pid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest_runs` (
    `rid` INTEGER NOT NULL AUTO_INCREMENT,
    `tid` INTEGER NOT NULL,
    `cid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL,
    `code` LONGTEXT NOT NULL,
    `iscpp` BOOLEAN NOT NULL DEFAULT true,
    `time` DOUBLE NOT NULL,
    `result` TEXT NOT NULL,
    `subtime` INTEGER NOT NULL,
    `scored` BOOLEAN NOT NULL DEFAULT false,
    `score` DOUBLE NOT NULL DEFAULT 0,

    INDEX `cid`(`cid` ASC),
    INDEX `tid`(`tid` ASC, `pid` ASC, `scored` ASC),
    PRIMARY KEY (`rid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tid` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `rid` INTEGER NOT NULL DEFAULT 0,

    INDEX `tid`(`tid` ASC, `type` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest_tests` (
    `tid` INTEGER NOT NULL AUTO_INCREMENT,
    `pid` INTEGER NOT NULL,
    `cid` INTEGER NOT NULL,
    `pretest_input` LONGTEXT NOT NULL,
    `pretest_output` LONGTEXT NOT NULL,
    `final_input` LONGTEXT NOT NULL,
    `final_output` LONGTEXT NOT NULL,
    `checker` LONGTEXT NOT NULL,
    `validator` LONGTEXT NOT NULL,
    `jury_code` LONGTEXT NOT NULL,

    UNIQUE INDEX `pid`(`pid` ASC),
    PRIMARY KEY (`tid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest_users` (
    `cid` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_hack` INTEGER NOT NULL,
    `tid` INTEGER NOT NULL,
    `sum` INTEGER NOT NULL,
    `penalty` INTEGER NOT NULL,
    `scores` TEXT NOT NULL,

    INDEX `cid`(`cid` ASC, `tid` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contests` (
    `cid` INTEGER NOT NULL AUTO_INCREMENT,
    `contestname` TEXT NOT NULL,
    `starttime` DATETIME(0) NOT NULL,
    `duration` INTEGER NOT NULL,
    `contesttype` TEXT NOT NULL,
    `sid` INTEGER NOT NULL,
    `announcement` LONGTEXT NULL,
    `rated` BOOLEAN NOT NULL,

    PRIMARY KEY (`cid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `debug_problems` (
    `dpid` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `name` TINYTEXT NOT NULL,
    `status` TINYTEXT NULL DEFAULT 'Active',
    `solved` INTEGER NOT NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,
    `rid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL,
    `language` VARCHAR(8) NOT NULL,
    `score` DOUBLE NOT NULL DEFAULT 0,
    `result` VARCHAR(8) NOT NULL,
    `mindiff` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `code`(`code` ASC),
    INDEX `rid`(`rid` ASC),
    PRIMARY KEY (`dpid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `debug_queue` (
    `rid` INTEGER NOT NULL,
    `drid` INTEGER NOT NULL,

    UNIQUE INDEX `drid`(`drid` ASC),
    PRIMARY KEY (`rid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `debug_submissions` (
    `drid` INTEGER NOT NULL AUTO_INCREMENT,
    `dpid` INTEGER NOT NULL,
    `rid` INTEGER NOT NULL,
    `tid` INTEGER NOT NULL,
    `language` VARCHAR(8) NOT NULL,
    `submittime` INTEGER NOT NULL,
    `result` VARCHAR(8) NOT NULL,
    `score` DOUBLE NOT NULL,
    `diff` INTEGER NULL,
    `code` LONGTEXT NOT NULL,

    INDEX `dpid`(`dpid` ASC),
    INDEX `tid`(`tid` ASC),
    PRIMARY KEY (`drid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `goose_db_version` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `version_id` BIGINT NOT NULL,
    `is_applied` BOOLEAN NOT NULL,
    `tstamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `gid` INTEGER NOT NULL AUTO_INCREMENT,
    `groupname` TINYTEXT NOT NULL,

    PRIMARY KEY (`gid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `in` (
    `a` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `time` INTEGER NOT NULL,
    `ip` TINYTEXT NULL,
    `tid` TEXT NULL,
    `request` TEXT NULL,

    PRIMARY KEY (`time` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `mid` INTEGER NOT NULL AUTO_INCREMENT,
    `sender` INTEGER NOT NULL,
    `recipient` INTEGER NOT NULL,
    `content` LONGTEXT NOT NULL,
    `time` INTEGER NOT NULL,
    `isread` BOOLEAN NOT NULL DEFAULT false,

    INDEX `sender`(`sender` ASC, `recipient` ASC, `time` ASC),
    PRIMARY KEY (`mid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_resets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `timeout` DATETIME(0) NOT NULL,

    INDEX `token`(`token` ASC),
    INDEX `user`(`user` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `problems` (
    `pid` INTEGER NOT NULL AUTO_INCREMENT,
    `sid` INTEGER NOT NULL DEFAULT 1,
    `code` VARCHAR(20) NOT NULL,
    `name` TINYTEXT NOT NULL,
    `type` TINYTEXT NOT NULL,
    `scoretype` TEXT NOT NULL,
    `cid` INTEGER NULL,
    `status` TINYTEXT NULL,
    `pgroup` TINYTEXT NOT NULL,
    `statement` LONGTEXT NOT NULL,
    `timelimit` FLOAT NOT NULL,
    `score` DOUBLE NOT NULL DEFAULT 0,
    `usechecker` BOOLEAN NOT NULL DEFAULT false,
    `checkercode` LONGTEXT NOT NULL,
    `solved` INTEGER NOT NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,

    INDEX `cid`(`cid` ASC),
    UNIQUE INDEX `code`(`code` ASC),
    PRIMARY KEY (`pid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_rankings` (
    `roomid` INTEGER NOT NULL,
    `tid` INTEGER NOT NULL,
    `time` INTEGER NOT NULL DEFAULT 0,
    `change` INTEGER NOT NULL DEFAULT 0,

    INDEX `roomid`(`roomid` ASC, `tid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pid` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,
    `lastrun` INTEGER NOT NULL,

    INDEX `pid`(`pid` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `runs` (
    `rid` INTEGER NOT NULL AUTO_INCREMENT,
    `pid` INTEGER NOT NULL,
    `tid` INTEGER NOT NULL,
    `language` VARCHAR(8) NOT NULL,
    `time` DOUBLE NOT NULL DEFAULT 0,
    `result` VARCHAR(3) NOT NULL,
    `access` TINYTEXT NOT NULL DEFAULT 'private',
    `submittime` INTEGER NOT NULL,
    `scored` BOOLEAN NOT NULL DEFAULT false,
    `score` DOUBLE NOT NULL DEFAULT 0,

    INDEX `pid`(`pid` ASC),
    INDEX `pid_2`(`pid` ASC, `tid` ASC, `score` ASC),
    INDEX `result`(`result` ASC),
    INDEX `rid`(`rid` ASC),
    INDEX `tid`(`tid` ASC),
    PRIMARY KEY (`rid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subs_code` (
    `rid` INTEGER NOT NULL AUTO_INCREMENT,
    `code` LONGTEXT NOT NULL,
    `error` TEXT NOT NULL DEFAULT '',

    PRIMARY KEY (`rid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `tid` INTEGER NOT NULL AUTO_INCREMENT,
    `teamname` VARCHAR(32) NOT NULL,
    `group` INTEGER NOT NULL,
    `teamname2` TINYTEXT NULL,
    `pass` TINYTEXT NOT NULL,
    `email` TEXT NOT NULL DEFAULT '',
    `name` TEXT NOT NULL,
    `signature` LONGTEXT NOT NULL DEFAULT '',
    `facebook` TEXT NOT NULL DEFAULT '',
    `status` TINYTEXT NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `penalty` INTEGER NOT NULL DEFAULT 0,
    `pscore` DOUBLE NOT NULL DEFAULT 0,
    `cscore` DOUBLE NOT NULL DEFAULT 0,
    `rating` INTEGER NOT NULL DEFAULT 1500,
    `solved` INTEGER NOT NULL DEFAULT 0,
    `lastlogin` INTEGER NOT NULL DEFAULT 0,
    `game_time` INTEGER NOT NULL DEFAULT 0,
    `game_wins` INTEGER NOT NULL DEFAULT 0,

    INDEX `pscore`(`pscore` ASC),
    INDEX `pscore_2`(`pscore` ASC),
    UNIQUE INDEX `teamname`(`teamname` ASC),
    PRIMARY KEY (`tid` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `xo_tables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `p1` INTEGER NOT NULL DEFAULT 0,
    `p2` INTEGER NOT NULL DEFAULT 0,
    `last_move` TEXT NOT NULL,
    `move_log` TEXT NOT NULL,

    INDEX `p1`(`p1` ASC, `p2` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `debug_problems` ADD CONSTRAINT `debug_problems_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `runs`(`rid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `debug_submissions` ADD CONSTRAINT `debug_submissions_ibfk_1` FOREIGN KEY (`dpid`) REFERENCES `debug_problems`(`dpid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `debug_submissions` ADD CONSTRAINT `debug_submissions_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `teams`(`tid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

