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