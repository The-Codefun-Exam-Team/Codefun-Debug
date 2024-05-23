SELECT
  tbl.activity_type,
  tbl.activity_created_at,
  tbl.post_id,
  tbl.post_title,
  tbl.comment_id,
  user_query.user_id,
  user_query.username,
  user_query.display_name,
  user_query.group_id,
  user_query.group_name,
  user_query.user_status,
  user_query.email,
  user_query.user_score,
  user_query.user_solved,
  user_query.user_ratio,
  user_query.user_rank
FROM
  (
    (
      SELECT
        'post' :: text AS activity_type,
        posts.author_id,
        posts.updated_at AS activity_created_at,
        posts.id AS post_id,
        posts.title AS post_title,
        NULL :: integer AS comment_id
      FROM
        public.posts
      ORDER BY
        posts.updated_at DESC
    )
    UNION
    (
      SELECT
        'comment' :: text AS activity_type,
        post_comments.author_id,
        post_comments.updated_at AS activity_created_at,
        posts.id AS post_id,
        posts.title AS post_title,
        post_comments.id AS comment_id
      FROM
        public.post_comments,
        public.posts
      WHERE
        (posts.id = post_comments.post_id)
      ORDER BY
        post_comments.updated_at DESC
    )
  ) tbl,
  public.user_query
WHERE
  (user_query.user_id = tbl.author_id)
ORDER BY
  tbl.activity_created_at DESC;