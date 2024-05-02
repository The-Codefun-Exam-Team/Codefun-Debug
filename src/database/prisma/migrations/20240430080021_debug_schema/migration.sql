-- CreateTable
CREATE TABLE "suzume"."debug_problems" (
    "id" SERIAL NOT NULL,
    "sub_id" INTEGER NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "debug_problem_code" VARCHAR(32) NOT NULL,
    "min_diff" INTEGER NOT NULL DEFAULT 32000,

    CONSTRAINT "debug_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suzume"."debug_submissions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sub_id" INTEGER NOT NULL,
    "debug_problem_id" INTEGER NOT NULL,
    "diff" INTEGER NOT NULL DEFAULT 32000,
    "score" DECIMAL(9,2) NOT NULL DEFAULT 0,
    "result" "public"."submission_result" NOT NULL DEFAULT 'Q',

    CONSTRAINT "debug_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "debug_problems_debug_problem_code_key" ON "suzume"."debug_problems"("debug_problem_code" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "debug_problems_sub_id_key" ON "suzume"."debug_problems"("sub_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "debug_submissions_sub_id_key" ON "suzume"."debug_submissions"("sub_id" ASC);

-- CreateIndex
CREATE INDEX "debug_submissions_user_id_debug_problem_id_score_idx" ON "suzume"."debug_submissions"("user_id" ASC, "debug_problem_id" ASC, "score" DESC);

-- AddForeignKey
ALTER TABLE "suzume"."debug_problems" ADD CONSTRAINT "debug_problems_sub_id_fkey" FOREIGN KEY ("sub_id") REFERENCES "public"."submissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suzume"."debug_submissions" ADD CONSTRAINT "debug_submissions_debug_problem_id_fkey" FOREIGN KEY ("debug_problem_id") REFERENCES "suzume"."debug_problems"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suzume"."debug_submissions" ADD CONSTRAINT "debug_submissions_sub_id_fkey" FOREIGN KEY ("sub_id") REFERENCES "public"."submissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suzume"."debug_submissions" ADD CONSTRAINT "debug_submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
