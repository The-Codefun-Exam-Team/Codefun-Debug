SELECT
  users.id AS user_id,
  users.username,
  users.display_name,
  g.group_id,
  g.group_name,
  users.user_status,
  users.email,
  users.score AS user_score,
  users.solved_count AS user_solved,
  user_rankings.ratio AS user_ratio,
  user_rankings.rank AS user_rank
FROM
  public.users,
  public.group_query g,
  public.user_rankings
WHERE
  (
    (g.group_id = users.group_id)
    AND (user_rankings.id = users.id)
  );