SELECT
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
  user_query.user_rank,
  posts.id AS post_id,
  posts.title AS post_title,
  posts.content AS post_content,
  posts.is_official AS post_is_official,
  posts.created_at AS post_created_at,
  posts.updated_at AS post_updated_at,
  (
    SELECT
      count(*) AS count
    FROM
      public.post_comments
    WHERE
      (post_comments.post_id = posts.id)
  ) AS post_comment_count
FROM
  public.posts,
  public.user_query
WHERE
  (user_query.user_id = posts.author_id);