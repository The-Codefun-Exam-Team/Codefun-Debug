-- Create view
CREATE OR REPLACE VIEW "suzume"."debug_problems_max_code" AS SELECT
  max((debug_problem_code) :: text) AS max_code
FROM
  debug_problems
WHERE
  (
    (debug_problem_code) :: text ~ similar_to_escape('D[0-9]+' :: text)
  );