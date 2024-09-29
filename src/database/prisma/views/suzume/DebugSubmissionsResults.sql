SELECT
  ds.id,
  ds.debug_problem_id,
  (
    (
      (
        (100) :: numeric * GREATEST(
          (0) :: numeric,
          (
            ((s.score) :: numeric - (dps.score) :: numeric) / ((100) :: numeric - (dps.score) :: numeric)
          )
        )
      ) * GREATEST(
        (0) :: numeric,
        (
          (1) :: numeric - (
            GREATEST(
              ((dsd.diff - dp.min_diff)) :: numeric,
              (0) :: numeric
            ) / (20) :: numeric
          )
        )
      )
    )
  ) :: numeric(9, 2) AS score,
  CASE
    WHEN (
      ((s.score) :: numeric = (100) :: numeric)
      AND ((dsd.diff - dp.min_diff) <= 0)
    ) THEN 'AC' :: submission_result
    WHEN ((s.score) :: numeric = (100) :: numeric) THEN 'SS' :: submission_result
    ELSE s.result
  END AS result
FROM
  (
    (
      (
        (
          debug_submissions ds
          JOIN debug_submissions_diff dsd ON ((ds.id = dsd.id))
        )
        JOIN submissions s ON ((ds.sub_id = s.id))
      )
      JOIN debug_problems dp ON ((ds.debug_problem_id = dp.id))
    )
    JOIN submissions dps ON ((dp.sub_id = dps.id))
  );