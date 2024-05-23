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
  post_comments.id AS comment_id,
  post_comments.post_id AS comment_post_id,
  post_comments.content AS comment_content,
  post_comments.created_at AS comment_created_at,
  post_comments.updated_at AS comment_updated_at,
  post_comments.parent_id AS comment_parent_id
FROM
  public.post_comments,
  public.user_query
WHERE
  (user_query.user_id = post_comments.author_id);