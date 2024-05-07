SELECT
  user_id,
  sum((score) :: numeric) AS score,
  rank() OVER (
    ORDER BY
      (sum((score) :: numeric)) DESC
  ) AS rank
FROM
  debug_submissions ds
WHERE
  (is_best = TRUE)
GROUP BY
  user_id
ORDER BY
  (sum((score) :: numeric)) DESC;