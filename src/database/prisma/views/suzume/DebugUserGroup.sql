SELECT
  DISTINCT ds.user_id,
  g.id AS group_id
FROM
  (
    (
      debug_submissions ds
      JOIN public.users u ON ((ds.user_id = u.id))
    )
    JOIN public.groups g ON ((u.group_id = g.id))
  )
WHERE
  (u.user_status <> 'banned' :: public.user_status);