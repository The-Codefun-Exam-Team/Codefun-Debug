SELECT
  DISTINCT ds.user_id,
  g.id AS group_id
FROM
  (
    (
      debug_submissions ds
      JOIN users u ON ((ds.user_id = u.id))
    )
    JOIN groups g ON ((u.group_id = g.id))
  )
WHERE
  (u.user_status <> 'banned' :: user_status);