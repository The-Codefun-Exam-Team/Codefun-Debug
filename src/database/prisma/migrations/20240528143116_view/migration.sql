-- Create view
CREATE OR REPLACE VIEW "suzume"."debug_submission_query" AS
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
  ds.diff
FROM
  (
    (
      (
        (
          debug_submissions ds
          JOIN public.submissions s ON ((ds.sub_id = s.id))
        )
        JOIN debug_user_stat dus ON ((s.user_id = dus.user_id))
      )
      JOIN debug_problems dp ON ((ds.debug_problem_id = dp.id))
    )
    JOIN public.submissions dps ON ((dp.sub_id = dps.id))
  )
ORDER BY
  s.created_at DESC;

-- Create view
CREATE OR REPLACE VIEW "suzume"."debug_user_group" AS
SELECT
  DISTINCT ds.user_id,
  g.id AS group_id
FROM
  (
    (
      debug_submissions ds
      JOIN public.users u ON ((ds.user_id = u.id))
    )
    JOIN public.groups g ON ((u.group_id = g.id))
  )
WHERE
  (u.user_status <> 'banned' :: public.user_status);

-- Create view 
CREATE OR REPLACE VIEW "suzume"."debug_user_rankings" AS
SELECT
  ds.user_id,
  sum((ds.score) :: numeric) AS score,
  CASE
    WHEN (u.user_status = 'banned' :: public.user_status) THEN NULL :: bigint
    ELSE rank() OVER (
      ORDER BY
        (sum((ds.score) :: numeric)) DESC
    )
  END AS rank
FROM
  (
    debug_submissions ds
    JOIN public.users u ON ((ds.user_id = u.id))
  )
WHERE
  (ds.is_best = TRUE)
GROUP BY
  ds.user_id,
  u.user_status
ORDER BY
  (sum((ds.score) :: numeric)) DESC;

-- Create view
CREATE OR REPLACE VIEW "suzume"."debug_user_stat" AS
SELECT
  u.id AS user_id,
  u.username,
  u.display_name,
  g.name AS group_name,
  g.id AS group_id,
  u.user_status,
  dur.score,
  ur.ratio,
  dur.rank,
  u.email
FROM
  (
    (
      (
        debug_user_rankings dur
        LEFT JOIN public.users u ON ((dur.user_id = u.id))
      )
      LEFT JOIN public.user_rankings ur ON ((dur.user_id = ur.id))
    )
    LEFT JOIN public.groups g ON ((u.group_id = g.id))
  )
ORDER BY
  dur.rank;