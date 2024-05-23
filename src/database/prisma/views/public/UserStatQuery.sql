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
  public.submissions,
  public.problems,
  public.problem_headers
WHERE
  (
    (submissions.is_best = TRUE)
    AND (submissions.problem_id = problems.id)
    AND (problems.id = problem_headers.problem_id)
  );