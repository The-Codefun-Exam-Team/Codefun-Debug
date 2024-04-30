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