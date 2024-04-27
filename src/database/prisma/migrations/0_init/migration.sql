-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "suzume";

-- CreateEnum
CREATE TYPE "public"."language" AS ENUM ('C++', 'Pascal', 'Java', 'Python2', 'Python3', 'Go', 'Nasm');

-- CreateEnum
CREATE TYPE "public"."score_type" AS ENUM ('acm', 'oi');

-- CreateEnum
CREATE TYPE "public"."submission_result" AS ENUM ('AC', 'CE', 'DQ', 'MLE', 'Q', 'RTE', 'SS', 'TLE', 'TO', 'WA', '...');

-- CreateEnum
CREATE TYPE "public"."user_status" AS ENUM ('normal', 'admin', 'banned');

-- CreateTable
CREATE TABLE "public"."goose_db_version" (
    "id" SERIAL NOT NULL,
    "version_id" BIGINT NOT NULL,
    "is_applied" BOOLEAN NOT NULL,
    "tstamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goose_db_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."groups" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."password_resets" (
    "user_id" INTEGER NOT NULL,
    "token" UUID NOT NULL DEFAULT gen_random_uuid(),
    "expires_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() + '01:00:00'::interval),

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "public"."post_comments" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "content" VARCHAR(32000) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."posts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "author_id" INTEGER NOT NULL,
    "content" VARCHAR(32000) NOT NULL,
    "is_official" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."problems" (
    "id" SERIAL NOT NULL,
    "setter_id" INTEGER NOT NULL,
    "problem_code" VARCHAR(32) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "score_type" "public"."score_type" NOT NULL,
    "problem_group" VARCHAR(128) NOT NULL,
    "statements" VARCHAR(32000) NOT NULL,
    "time_limit" DECIMAL(4,2) NOT NULL,
    "score" DECIMAL(9,2) NOT NULL,
    "checker_source" VARCHAR(32000),
    "solved_count" INTEGER NOT NULL,
    "total_attempts" INTEGER NOT NULL,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."submissions" (
    "id" SERIAL NOT NULL,
    "problem_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "language" "public"."language" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" "public"."submission_result" NOT NULL,
    "running_time" DECIMAL(5,3) NOT NULL DEFAULT 0,
    "score" DECIMAL(9,2) NOT NULL DEFAULT 0,
    "is_best" BOOLEAN NOT NULL,
    "source" VARCHAR(32000) NOT NULL,
    "judge_output" TEXT,
    "scored_at" TIMESTAMPTZ(6),

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "group_id" INTEGER NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "email" VARCHAR(128),
    "display_name" VARCHAR(128) NOT NULL,
    "user_status" "public"."user_status" NOT NULL DEFAULT 'normal',
    "score" DECIMAL(9,2) NOT NULL DEFAULT 0,
    "solved_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groups_name_key" ON "public"."groups"("name");

-- CreateIndex
CREATE INDEX "post_comments_post" ON "public"."post_comments"("post_id", "id");

-- CreateIndex
CREATE INDEX "post_comments_updated_at" ON "public"."post_comments"("updated_at" DESC);

-- CreateIndex
CREATE INDEX "posts_updated_at" ON "public"."posts"("updated_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "problems_problem_code_key" ON "public"."problems"("problem_code");

-- CreateIndex
CREATE UNIQUE INDEX "problems_problem_code_header" ON "public"."problems"("problem_code", "id", "name");

-- CreateIndex
CREATE INDEX "submissions_problems_score" ON "public"."submissions"("problem_id", "score", "id", "user_id");

-- CreateIndex
CREATE INDEX "subs_by_problem" ON "public"."submissions"("problem_id", "id" DESC);

-- CreateIndex
CREATE INDEX "subs_by_user" ON "public"."submissions"("user_id", "id" DESC);

-- CreateIndex
CREATE INDEX "subs_by_user_problem" ON "public"."submissions"("user_id", "problem_id", "id" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_ranking" ON "public"."users"("score" DESC, "id");

-- AddForeignKey
ALTER TABLE "public"."password_resets" ADD CONSTRAINT "password_resets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."post_comments" ADD CONSTRAINT "post_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."post_comments" ADD CONSTRAINT "post_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."problems" ADD CONSTRAINT "problems_setter_id_fkey" FOREIGN KEY ("setter_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."submissions" ADD CONSTRAINT "submissions_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."submissions" ADD CONSTRAINT "submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
