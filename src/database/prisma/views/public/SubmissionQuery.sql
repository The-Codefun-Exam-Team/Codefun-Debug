SELECT
  submission_listing.sub_id,
  submission_listing.problem_id,
  submission_listing.problem_code,
  submission_listing.problem_name,
  submission_listing.user_id,
  submission_listing.username,
  submission_listing.display_name,
  submission_listing.group_id,
  submission_listing.group_name,
  submission_listing.user_status,
  submission_listing.email,
  submission_listing.user_score,
  submission_listing.user_solved,
  submission_listing.user_ratio,
  submission_listing.user_rank,
  submission_listing.sub_language,
  submission_listing.sub_result,
  submission_listing.sub_created_at,
  submission_listing.sub_running_time,
  submission_listing.sub_is_best,
  submission_listing.sub_score,
  submissions.source AS sub_code,
  submissions.judge_output AS sub_judge,
  submissions.scored_at AS sub_scored_at
FROM
  submission_listing,
  submissions
WHERE
  (submission_listing.sub_id = submissions.id);