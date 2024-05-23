SELECT
  submissions.id AS sub_id,
  problems.problem_code,
  submissions.source AS sub_code,
  submissions.language AS sub_language,
  problems.checker_source AS problem_checker,
  problems.score_type,
  problems.time_limit
FROM
  public.submissions,
  public.problems
WHERE
  (
    (submissions.problem_id = problems.id)
    AND (
      submissions.result = ANY (
        ARRAY ['Q'::public.submission_result, '...'::public.submission_result]
      )
    )
  );