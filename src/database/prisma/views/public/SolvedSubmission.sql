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