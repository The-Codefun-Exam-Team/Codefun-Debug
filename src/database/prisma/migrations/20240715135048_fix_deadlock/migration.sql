-- Drop function and related trigger
DROP FUNCTION "suzume"."debug_problems_update_min_diff"() CASCADE;

-- Drop function and related trigger
DROP FUNCTION "suzume"."debug_sub_before_update_diff"() CASCADE;

-- Drop function and related trigger
DROP FUNCTION "suzume"."debug_sub_after_update_diff"() CASCADE;

-- Drop function and related trigger
DROP FUNCTION "suzume"."submissions_update_score_suzume"() CASCADE;

-- Separate diff from debug submissions
SELECT 
  ds.id, ds.diff
INTO 
  "suzume"."debug_submissions_diff"
FROM 
  "suzume"."debug_submissions" ds;

-- Add foreign key
ALTER TABLE "suzume"."debug_submissions_diff" ADD FOREIGN KEY(id) REFERENCES "suzume"."debug_submissions"(id);

-- Drop view related to column diff
DROP VIEW "suzume"."debug_submission_query";

-- Drop column
ALTER TABLE "suzume"."debug_submissions" DROP COLUMN diff;

-- Recreate view
CREATE VIEW "suzume"."debug_submission_query" AS 
SELECT 
  ds.id,
  s.created_at AS submit_time,
  s.running_time AS runtime,
  s.source,
  dus.username,
  dus.display_name AS user_display_name,
  dus.group_name AS user_group_name,
  dus.user_status,
  dus.score AS user_score,
  dus.rank AS user_rank,
  dus.ratio AS user_ratio,
  dus.email AS user_email,
  dp.debug_problem_code,
  dps.judge_output AS debug_problem_judge,
  dps.source AS debug_problem_source,
  s.language AS debug_problem_language,
  s.judge_output AS debug_submission_judge,
  ds.score,
  ds.result,
  dsd.diff
FROM 
  (
    (
      (
        (
          (
            debug_submissions ds 
            JOIN debug_submissions_diff dsd ON ((ds.id = dsd.id)) 
          )
          JOIN submissions s ON ((ds.sub_id = s.id))
        )
        JOIN debug_user_stat dus ON ((s.user_id = dus.user_id))
      )
      JOIN debug_problems dp ON ((ds.debug_problem_id = dp.id))
    )
    JOIN submissions dps ON ((dp.sub_id = dps.id))
  )
