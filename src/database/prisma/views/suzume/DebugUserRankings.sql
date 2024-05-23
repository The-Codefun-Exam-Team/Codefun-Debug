SELECT
  ds.user_id,
  sum((ds.score) :: numeric) AS score,
  CASE
    WHEN (u.user_status = 'banned' :: public.user_status) THEN NULL :: bigint
    ELSE rank() OVER (
      ORDER BY
        (sum((ds.score) :: numeric)) DESC
    )
  END AS rank
FROM
  (
    debug_submissions ds
    JOIN public.users u ON ((ds.user_id = u.id))
  )
WHERE
  (ds.is_best = TRUE)
GROUP BY
  ds.user_id,
  u.user_status
ORDER BY
  (sum((ds.score) :: numeric)) DESC;