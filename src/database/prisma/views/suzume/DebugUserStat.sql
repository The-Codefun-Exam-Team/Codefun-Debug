SELECT
  u.id AS user_id,
  u.username,
  u.display_name,
  g.name AS group_name,
  g.id AS group_id,
  u.user_status,
  dur.score,
  ur.ratio,
  dur.rank,
  u.email
FROM
  (
    (
      (
        debug_user_rankings dur
        JOIN users u ON ((dur.user_id = u.id))
      )
      JOIN user_rankings ur ON ((dur.user_id = ur.id))
    )
    JOIN groups g ON ((u.group_id = g.id))
  )
WHERE
  (u.user_status <> 'banned' :: user_status)
ORDER BY
  dur.rank;