-- Create trigger function
CREATE OR REPLACE FUNCTION "suzume"."debug_problems_update_min_diff"() RETURNS trigger AS
  $trigger$
  DECLARE dps_score DECIMAL(9,2);
  BEGIN
    SELECT s.score INTO dps_score FROM submissions s WHERE NEW.sub_id = s.id;
    UPDATE debug_submissions ds
      SET 
        score = 
          100::numeric * CASE 
            WHEN s.score < dps_score THEN 0::numeric
            ELSE (s.score - dps_score)::numeric / (100::numeric - dps_score) 
          END * CASE 
            WHEN ds.diff - NEW.min_diff <= 0 THEN 1
            WHEN ds.diff - NEW.min_diff >= 20 THEN 0
            ELSE 1 - (ds.diff - NEW.min_diff)::numeric / 20
          END,
        result = CASE
          WHEN s.score = 100 AND ds.diff - NEW.min_diff <= 0 THEN 'AC'::submission_result
          WHEN s.score = 100 THEN 'SS'::submission_result
          ELSE s.result
        END
    FROM 
      submissions s
    WHERE 
      ds.sub_id = s.id AND NEW.id = ds.debug_problem_id;
    RETURN NEW;
  END;
  $trigger$ LANGUAGE plpgsql;

-- Create trigger
CREATE OR REPLACE TRIGGER "debug_problems_update_min_diff" 
  AFTER UPDATE OF min_diff 
  ON debug_problems
  FOR EACH ROW 
  EXECUTE FUNCTION "suzume"."debug_problems_update_min_diff"();  

-- Create trigger function
CREATE OR REPLACE FUNCTION "suzume"."debug_sub_before_update_diff"() RETURNS trigger AS
  $trigger$
  DECLARE 
    problem_min_diff integer;
    sub_score DECIMAL(9,2);
    sub_result submission_result;
    dps_score DECIMAL(9,2);
  BEGIN
    SELECT
      debug_problems.min_diff,
      submissions.score
    INTO 
      problem_min_diff,
      dps_score
    FROM 
      debug_problems
      JOIN submissions ON debug_problems.sub_id = submissions.id
    WHERE 
      NEW.debug_problem_id = debug_problems.id;

    SELECT 
      submissions.score, 
      submissions.result 
    INTO 
      sub_score, 
      sub_result 
    FROM 
      submissions 
    WHERE 
      NEW.sub_id = submissions.id;

    IF NEW.diff >= problem_min_diff OR sub_score != 100::dbl_score THEN
      NEW.score := 
        100::numeric * CASE 
          WHEN sub_score < dps_score THEN 0
          ELSE (sub_score - dps_score)::numeric / (100::numeric - dps_score) 
        END * CASE 
          WHEN NEW.diff - problem_min_diff <= 0 THEN 1
          WHEN NEW.diff - problem_min_diff >= 20 THEN 0
          ELSE 1 - (NEW.diff - problem_min_diff)::numeric / 20
        END;
      NEW.result := CASE
          WHEN sub_score = 100 AND NEW.diff - problem_min_diff <= 0 THEN 'AC'::submission_result
          WHEN sub_score = 100 THEN 'SS'::submission_result
          ELSE sub_result
        END;
    END IF;
    RETURN NEW;
  END;
  $trigger$ LANGUAGE plpgsql;

-- Create trigger
CREATE OR REPLACE TRIGGER "debug_sub_before_update_diff" 
  BEFORE UPDATE OF diff 
  ON debug_submissions
  FOR EACH ROW 
  EXECUTE FUNCTION "suzume"."debug_sub_before_update_diff"(); 

-- Create trigger function
CREATE OR REPLACE FUNCTION "suzume"."debug_sub_after_update_diff"() RETURNS trigger AS
  $trigger$
  DECLARE 
    problem_min_diff integer;
    sub_score DECIMAL(9,2);
    max_score DECIMAL(9,2);
  BEGIN
    SELECT debug_problems.min_diff INTO problem_min_diff FROM debug_problems WHERE NEW.debug_problem_id = debug_problems.id;
    SELECT submissions.score INTO sub_score FROM submissions WHERE NEW.sub_id = submissions.id;
    IF NEW.diff < problem_min_diff AND sub_score = 100::dbl_score THEN
      UPDATE debug_submissions ds
      SET
        is_best = FALSE
      WHERE 
        ds.debug_problem_id = NEW.debug_problem_id AND
        ds.user_id = NEW.user_id AND
        ds.is_best = TRUE;
      UPDATE debug_submissions ds 
      SET 
        is_best = TRUE
      WHERE 
        ds.id = NEW.id;
      UPDATE debug_problems 
      SET 
        min_diff = NEW.diff 
      WHERE 
        NEW.debug_problem_id = debug_problems.id;
    ELSE
      SELECT 
        ds.score
      INTO 
        max_score
      FROM 
        debug_submissions ds
      WHERE 
        ds.debug_problem_id = NEW.debug_problem_id AND
        ds.user_id = NEW.user_id AND
        ds.is_best = TRUE;
      IF NEW.score > max_score THEN
        UPDATE debug_submissions ds
        SET
          is_best = FALSE
        WHERE 
          ds.debug_problem_id = NEW.debug_problem_id AND
          ds.user_id = NEW.user_id AND
          ds.is_best = TRUE;
        UPDATE debug_submissions ds 
        SET 
          is_best = TRUE
        WHERE 
          ds.id = NEW.id;
      END IF;
    END IF;
    RETURN NEW;
  END;
  $trigger$ LANGUAGE plpgsql;

-- Create trigger
CREATE OR REPLACE TRIGGER "debug_sub_after_update_diff" 
  AFTER UPDATE OF diff 
  ON debug_submissions
  FOR EACH ROW 
  EXECUTE FUNCTION "suzume"."debug_sub_after_update_diff"();