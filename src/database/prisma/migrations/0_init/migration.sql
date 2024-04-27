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
    "time_limit" DECIMAL(4,2) NOT NULL CHECK("time_limit" > 0),
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
    "running_time" DECIMAL(5,3) NOT NULL DEFAULT 0 CHECK("running_time" >= 0),
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
    "email" VARCHAR(128) CHECK (email IS NULL OR length(email::text) > 0),
    "display_name" VARCHAR(128) NOT NULL CHECK (length(display_name::text) <= 64),
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

-- Unsupported features in Prisma

-- CreateView
CREATE VIEW "public"."group_query" AS
  SELECT
    id AS group_id,
    name AS group_name
  FROM
    groups;


-- CreateView
CREATE VIEW "public"."stats" AS 
  SELECT
    count(*) AS problem_count
  FROM
    problems;

-- CreateView
CREATE MATERIALIZED VIEW "public"."user_rankings" AS 
  WITH computed AS (
    SELECT
      (stats.problem_count) :: numeric(9, 2) AS problem_count
    FROM
      stats
    )
  SELECT
    id,
    rank() OVER (
      ORDER BY
        score DESC
    ) AS rank,
    (
      (
        (solved_count) :: numeric(9, 2) / (
          SELECT
            computed.problem_count
          FROM
            computed
        )
      )
    ) :: numeric(9, 2) AS ratio
  FROM
    users
  WHERE
    (
      user_status <> 'banned' :: user_status
    );

-- AddIndex 
CREATE UNIQUE INDEX "user_rankings_by_id" ON "public"."user_rankings" (id);

-- CreateView
CREATE VIEW "public"."user_query" AS 
  SELECT
    users.id AS user_id,
    users.username,
    users.display_name,
    g.group_id,
    g.group_name,
    users.user_status,
    users.email,
    users.score AS user_score,
    users.solved_count AS user_solved,
    user_rankings.ratio AS user_ratio,
    user_rankings.rank AS user_rank
  FROM
    users,
    group_query g,
    user_rankings
  WHERE
    (
      (g.group_id = users.group_id)
      AND (user_rankings.id = users.id)
    );

-- CreateView
CREATE VIEW "public"."judge_requests" AS 
  SELECT
    submissions.id AS sub_id,
    problems.problem_code,
    submissions.source AS sub_code,
    submissions.language AS sub_language,
    problems.checker_source AS problem_checker,
    problems.score_type,
    problems.time_limit
  FROM
    submissions,
    problems
  WHERE
    (
      (submissions.problem_id = problems.id)
      AND (
        submissions.result = ANY (
          ARRAY ['Q'::submission_result, '...'::submission_result]
        )
      )
    );

-- CreateView
CREATE VIEW "public"."post_query" AS 
  SELECT
    user_query.user_id,
    user_query.username,
    user_query.display_name,
    user_query.group_id,
    user_query.group_name,
    user_query.user_status,
    user_query.email,
    user_query.user_score,
    user_query.user_solved,
    user_query.user_ratio,
    user_query.user_rank,
    posts.id AS post_id,
    posts.title AS post_title,
    posts.content AS post_content,
    posts.is_official AS post_is_official,
    posts.created_at AS post_created_at,
    posts.updated_at AS post_updated_at,
    (
      SELECT
        count(*) AS count
      FROM
        post_comments
      WHERE
        (post_comments.post_id = posts.id)
    ) AS post_comment_count
  FROM
    posts,
    user_query
  WHERE
    (user_query.user_id = posts.author_id);

-- CreateView
CREATE VIEW "public"."problem_headers" AS 
  SELECT
    id AS problem_id,
    problem_code,
    name AS problem_name
  FROM
    problems;

-- CreateView
CREATE VIEW "public"."problem_listing" AS 
  SELECT
    problem_headers.problem_id,
    problem_headers.problem_code,
    problem_headers.problem_name,
    user_query.user_id,
    user_query.username,
    user_query.display_name,
    user_query.group_id,
    user_query.group_name,
    user_query.user_status,
    user_query.email,
    user_query.user_score,
    user_query.user_solved,
    user_query.user_ratio,
    user_query.user_rank,
    problems.score_type,
    problems.problem_group,
    problems.time_limit AS problem_time_limit,
    problems.score AS problem_score,
    problems.checker_source AS problem_checker,
    problems.solved_count AS problem_solved,
    problems.total_attempts AS problem_total
  FROM
    problems,
    user_query,
    problem_headers
  WHERE
    (
      (problems.setter_id = user_query.user_id)
      AND (
        (problems.problem_code) :: text = (problem_headers.problem_code) :: text
      )
    );

-- CreateView
CREATE VIEW "public"."problem_query" AS
  SELECT
    problem_listing.problem_id,
    problem_listing.problem_code,
    problem_listing.problem_name,
    problem_listing.user_id,
    problem_listing.username,
    problem_listing.display_name,
    problem_listing.group_id,
    problem_listing.group_name,
    problem_listing.user_status,
    problem_listing.email,
    problem_listing.user_score,
    problem_listing.user_solved,
    problem_listing.user_ratio,
    problem_listing.user_rank,
    problem_listing.score_type,
    problem_listing.problem_group,
    problem_listing.problem_time_limit,
    problem_listing.problem_score,
    problem_listing.problem_checker,
    problem_listing.problem_solved,
    problem_listing.problem_total,
    problems.statements AS problem_statements
  FROM
    problems,
    problem_listing
  WHERE
    (
      (problems.problem_code) :: text = (problem_listing.problem_code) :: text
    );

-- CreateView
CREATE VIEW "public"."solved_submissions" AS 
  SELECT
    submissions.id,
    submissions.problem_id,
    submissions.user_id
  FROM
    submissions,
    problems
  WHERE
    (
      (submissions.problem_id = problems.id)
      AND (
        (submissions.score) :: numeric = (problems.score) :: numeric
      )
      AND (submissions.is_best = TRUE)
    );

-- CreateView
CREATE VIEW "public"."submission_listing" AS 
  SELECT
    submissions.id AS sub_id,
    problem_headers.problem_id,
    problem_headers.problem_code,
    problem_headers.problem_name,
    user_query.user_id,
    user_query.username,
    user_query.display_name,
    user_query.group_id,
    user_query.group_name,
    user_query.user_status,
    user_query.email,
    user_query.user_score,
    user_query.user_solved,
    user_query.user_ratio,
    user_query.user_rank,
    submissions.language AS sub_language,
    submissions.result AS sub_result,
    submissions.created_at AS sub_created_at,
    submissions.running_time AS sub_running_time,
    submissions.is_best AS sub_is_best,
    submissions.score AS sub_score
  FROM
    (
      (
        submissions
        JOIN problem_headers ON (
          (
            submissions.problem_id = problem_headers.problem_id
          )
        )
      )
      JOIN user_query ON ((submissions.user_id = user_query.user_id))
    );

-- CreateView
CREATE VIEW "public"."submission_query" AS 
  SELECT
    submission_listing.sub_id,
    submission_listing.problem_id,
    submission_listing.problem_code,
    submission_listing.problem_name,
    submission_listing.user_id,
    submission_listing.username,
    submission_listing.display_name,
    submission_listing.group_id,
    submission_listing.group_name,
    submission_listing.user_status,
    submission_listing.email,
    submission_listing.user_score,
    submission_listing.user_solved,
    submission_listing.user_ratio,
    submission_listing.user_rank,
    submission_listing.sub_language,
    submission_listing.sub_result,
    submission_listing.sub_created_at,
    submission_listing.sub_running_time,
    submission_listing.sub_is_best,
    submission_listing.sub_score,
    submissions.source AS sub_code,
    submissions.judge_output AS sub_judge,
    submissions.scored_at AS sub_scored_at
  FROM
    submission_listing,
    submissions
  WHERE
    (submission_listing.sub_id = submissions.id);

-- CreateView
CREATE VIEW "public"."user_stats_query" AS 
  SELECT
    problem_headers.problem_id,
    problem_headers.problem_code,
    problem_headers.problem_name,
    problems.score AS problem_score,
    submissions.id AS sub_id,
    submissions.user_id AS sub_user_id,
    submissions.created_at AS sub_submitted_at,
    submissions.score AS sub_score
  FROM
    submissions,
    problems,
    problem_headers
  WHERE
    (
      (submissions.is_best = TRUE)
      AND (submissions.problem_id = problems.id)
      AND (problems.id = problem_headers.problem_id)
    );

-- CreateView
CREATE VIEW "public"."activities" AS 
  SELECT
    tbl.activity_type,
    tbl.activity_created_at,
    tbl.post_id,
    tbl.post_title,
    tbl.comment_id,
    user_query.user_id,
    user_query.username,
    user_query.display_name,
    user_query.group_id,
    user_query.group_name,
    user_query.user_status,
    user_query.email,
    user_query.user_score,
    user_query.user_solved,
    user_query.user_ratio,
    user_query.user_rank
  FROM
    (
      (
        SELECT
          'post' :: text AS activity_type,
          posts.author_id,
          posts.updated_at AS activity_created_at,
          posts.id AS post_id,
          posts.title AS post_title,
          NULL :: integer AS comment_id
        FROM
          posts
        ORDER BY
          posts.updated_at DESC
      )
      UNION
      (
        SELECT
          'comment' :: text AS activity_type,
          post_comments.author_id,
          post_comments.updated_at AS activity_created_at,
          posts.id AS post_id,
          posts.title AS post_title,
          post_comments.id AS comment_id
        FROM
          post_comments,
          posts
        WHERE
          (posts.id = post_comments.post_id)
        ORDER BY
          post_comments.updated_at DESC
      )
    ) tbl,
    user_query
  WHERE
    (user_query.user_id = tbl.author_id)
  ORDER BY
    tbl.activity_created_at DESC;

-- CreateView
CREATE VIEW "public"."post_comment_query" AS 
  SELECT
    user_query.user_id,
    user_query.username,
    user_query.display_name,
    user_query.group_id,
    user_query.group_name,
    user_query.user_status,
    user_query.email,
    user_query.user_score,
    user_query.user_solved,
    user_query.user_ratio,
    user_query.user_rank,
    post_comments.id AS comment_id,
    post_comments.post_id AS comment_post_id,
    post_comments.content AS comment_content,
    post_comments.created_at AS comment_created_at,
    post_comments.updated_at AS comment_updated_at,
    post_comments.parent_id AS comment_parent_id
  FROM
    post_comments,
    user_query
  WHERE
    (user_query.user_id = post_comments.author_id);