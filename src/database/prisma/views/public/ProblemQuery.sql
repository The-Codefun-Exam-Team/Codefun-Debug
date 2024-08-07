SELECT
  problem_listing.problem_id,
  problem_listing.problem_code,
  problem_listing.problem_name,
  problem_listing.user_id,
  problem_listing.username,
  problem_listing.display_name,
  problem_listing.group_id,
  problem_listing.group_name,
  problem_listing.user_status,
  problem_listing.email,
  problem_listing.user_score,
  problem_listing.user_solved,
  problem_listing.user_ratio,
  problem_listing.user_rank,
  problem_listing.score_type,
  problem_listing.problem_group,
  problem_listing.problem_time_limit,
  problem_listing.problem_score,
  problem_listing.problem_checker,
  problem_listing.problem_solved,
  problem_listing.problem_total,
  problems.statements AS problem_statements
FROM
  problems,
  problem_listing
WHERE
  (
    (problems.problem_code) :: text = (problem_listing.problem_code) :: text
  );