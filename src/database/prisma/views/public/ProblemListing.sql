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
  public.problems,
  public.user_query,
  public.problem_headers
WHERE
  (
    (problems.setter_id = user_query.user_id)
    AND (
      (problems.problem_code) :: text = (problem_headers.problem_code) :: text
    )
  );