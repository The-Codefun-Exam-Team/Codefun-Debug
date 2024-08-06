-- Drop function and related trigger
DROP FUNCTION "suzume"."debug_problems_update_min_diff"() CASCADE;

-- Drop function and related trigger
DROP FUNCTION "suzume"."debug_sub_before_update_diff"() CASCADE;

-- Drop function and related trigger
DROP FUNCTION "suzume"."debug_sub_after_update_diff"() CASCADE;

-- Drop function and related trigger
DROP FUNCTION "suzume"."submissions_update_score_suzume"() CASCADE;

-- Separate diff from debug submissions
SELECT 
  ds.id, ds.diff
INTO 
  "suzume"."debug_submissions_diff"
FROM 
  "suzume"."debug_submissions" ds;

-- Add primary key
ALTER TABLE "suzume"."debug_submissions_diff" ADD PRIMARY KEY(id);

-- Add foreign key
ALTER TABLE "suzume"."debug_submissions_diff" ADD FOREIGN KEY(id) REFERENCES "suzume"."debug_submissions"(id) ON DELETE CASCADE;

-- Drop view related to column diff
DROP VIEW "suzume"."debug_submission_query";

-- Drop column
ALTER TABLE "suzume"."debug_submissions" DROP COLUMN diff;

-- Recreate view
CREATE VIEW "suzume"."debug_submission_query" AS 
SELECT 
  ds.id,
  s.created_at AS submit_time,
  s.running_time AS runtime,
  s.source,
  dus.username,
  dus.display_name AS user_display_name,
  dus.group_name AS user_group_name,
  dus.user_status,
  dus.score AS user_score,
  dus.rank AS user_rank,
  dus.ratio AS user_ratio,
  dus.email AS user_email,
  dp.debug_problem_code,
  dps.judge_output AS debug_problem_judge,
  dps.source AS debug_problem_source,
  s.language AS debug_problem_language,
  s.judge_output AS debug_submission_judge,
  ds.score,
  ds.result,
  dsd.diff
FROM 
  (
    (
      (
        (
          (
            debug_submissions ds 
            JOIN debug_submissions_diff dsd ON ((ds.id = dsd.id)) 
          )
          JOIN submissions s ON ((ds.sub_id = s.id))
        )
        JOIN debug_user_stat dus ON ((s.user_id = dus.user_id))
      )
      JOIN debug_problems dp ON ((ds.debug_problem_id = dp.id))
    )
    JOIN submissions dps ON ((dp.sub_id = dps.id))
  );

-- Create view to calculate debug submissions results and scores
CREATE VIEW "suzume"."debug_submissions_results" AS 
SELECT
  ds.id,
  ds.debug_problem_id,
  (
    100::numeric
    * GREATEST(
        0::numeric,
        (s.score - dps.score) / (100::numeric - dps.score)
    )
    * GREATEST(
        0::numeric,
        1 - GREATEST(dsd.diff - dp.min_diff, 0::numeric) / 20
    )
  )::numeric(9,2) AS score,
  CASE
    WHEN s.score = 100 AND dsd.diff - dp.min_diff <= 0 THEN 'AC'::submission_result
    WHEN s.score = 100 THEN 'SS'::submission_result
    ELSE s.result
  END AS result
FROM 
  debug_submissions ds
  JOIN debug_submissions_diff dsd ON ds.id = dsd.id
  JOIN submissions s ON ds.sub_id = s.id
  JOIN debug_problems dp ON ds.debug_problem_id = dp.id
  JOIN submissions dps ON dp.sub_id = dps.id;

-- Create trigger function and trigger
CREATE FUNCTION "suzume"."dsd_update_diff"() RETURNS trigger SECURITY DEFINER AS
  $trigger$
  DECLARE
    sub_score NUMERIC(9,2);
    min_diff INTEGER;
    dp_id INTEGER;
  BEGIN
    -- Get submission score
    SELECT 
      s.score,
      dp.min_diff,
      dp.id
    INTO
      sub_score,
      min_diff,
      dp_id
    FROM 
      debug_submissions ds
      JOIN submissions s ON ds.sub_id = s.id
      JOIN debug_problems dp ON ds.debug_problem_id = dp.id
    WHERE
      NEW.id = ds.id;    
    IF sub_score >= 99.99::numeric(9,2) AND NEW.diff < min_diff THEN
      -- Update problem's min diff
      UPDATE 
        debug_problems dp 
      SET 
        min_diff = NEW.diff 
      WHERE 
        dp.id = dp_id;
    ELSE
      -- Update submission score
      UPDATE 
        debug_submissions ds
      SET
        score = dsr.score,
        result = dsr.result
      FROM 
        debug_submissions_results dsr
      WHERE 
        NEW.id = dsr.id 
        AND ds.id = dsr.id;
    END IF;
    RETURN NEW;
  END;
  $trigger$ LANGUAGE plpgsql;

CREATE TRIGGER "dsd_update_diff"
  AFTER INSERT
  ON "suzume"."debug_submissions_diff"
  FOR EACH ROW 
  EXECUTE FUNCTION "suzume"."dsd_update_diff"();

-- Create trigger function and trigger
CREATE FUNCTION "suzume"."dp_update_min_diff"() RETURNS trigger SECURITY DEFINER AS
  $trigger$
  BEGIN
    UPDATE 
      debug_submissions ds
    SET
      score = dsr.score,
      result = dsr.result
    FROM
      debug_submissions_results dsr
    WHERE
      ds.id = dsr.id
      AND ds.debug_problem_id = NEW.id;
  RETURN NEW;
  END;
  $trigger$ LANGUAGE plpgsql;

CREATE TRIGGER "dp_update_min_diff"
  AFTER UPDATE OF min_diff
  ON "suzume"."debug_problems"
  FOR EACH ROW
  EXECUTE FUNCTION "suzume"."dp_update_min_diff"();

-- Create trigger function and trigger
CREATE FUNCTION "suzume"."ds_update_score"() RETURNS trigger SECURITY DEFINER AS
  $trigger$
  DECLARE 
    best_score NUMERIC(9,2);
  BEGIN  
    SELECT
      score
    INTO 
      best_score
    FROM 
      debug_submissions ds
    WHERE 
      ds.debug_problem_id = NEW.debug_problem_id
      AND ds.user_id = NEW.user_id
      AND is_best = TRUE;
    IF NEW.score > best_score THEN
      UPDATE 
        debug_submissions ds
      SET
        is_best = FALSE
      WHERE
        ds.debug_problem_id = NEW.debug_problem_id
        AND ds.user_id = NEW.user_id
        AND is_best = TRUE;
      UPDATE 
        debug_submissions ds 
      SET 
        is_best = TRUE
      WHERE
        ds.id = NEW.id;
    END IF;
    RETURN NEW;
  END;
  $trigger$ LANGUAGE plpgsql;

CREATE TRIGGER "ds_update_score"
  AFTER UPDATE OF score
  ON "suzume"."debug_submissions"
  FOR EACH ROW
  EXECUTE FUNCTION "suzume"."ds_update_score"();

-- Create trigger function and trigger
CREATE FUNCTION "suzume"."s_update_score"() RETURNS trigger SECURITY DEFINER AS 
  $trigger$
    BEGIN 
      UPDATE
        debug_submissions ds
      SET
        score = dsr.score,
        result = dsr.result
      FROM 
        debug_submissions_results dsr
      WHERE
        ds.id = dsr.id
        AND ds.sub_id = NEW.id;
      RETURN NEW;
    END;
  $trigger$ LANGUAGE plpgsql;

CREATE TRIGGER "s_update_score_suzume"
  AFTER UPDATE OF score
  ON "public"."submissions"
  FOR EACH ROW
  EXECUTE FUNCTION "suzume"."s_update_score"();

