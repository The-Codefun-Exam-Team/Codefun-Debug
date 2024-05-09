-- Create trigger function
CREATE OR REPLACE FUNCTION "as"."debug_problems_update_min_diff"() RETURNS trigger AS
  $trigger$
  BEGIN
    UPDATE debug_submissions ds
      SET 
        score = s.score * CASE 
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
    max_score DECIMAL(9,2);
  BEGIN
    SELECT debug_problems.min_diff INTO problem_min_diff FROM debug_problems WHERE NEW.debug_problem_id = debug_problems.id;
    SELECT submissions.score, submissions.result INTO sub_score, sub_result FROM submissions WHERE NEW.sub_id = submissions.id;
    IF NEW.diff < problem_min_diff AND sub_score = 100::dbl_score THEN
      NEW.is_best := TRUE;
    UPDATE debug_submissions
    SET is_best = FALSE
    WHERE 
      debug_problem_id = NEW.debug_problem_id
      AND user_id = NEW.user_id
      AND is_best = TRUE;
    ELSE
      NEW.score := sub_score * CASE 
        WHEN NEW.diff - problem_min_diff <= 0 THEN 1
        WHEN NEW.diff - problem_min_diff >= 20 THEN 0
        ELSE 1 - (NEW.diff - problem_min_diff)::numeric / 20
      END;
      NEW.result := CASE
        WHEN sub_score = 100 AND NEW.diff - problem_min_diff <= 0 THEN 'AC'::submission_result
        WHEN sub_score = 100 THEN 'SS'::submission_result
        ELSE sub_result
      END;
      SELECT score INTO max_score
        FROM debug_submissions
        WHERE 
          debug_problem_id = NEW.debug_problem_id
          AND user_id = NEW.user_id
          AND is_best = TRUE
          AND id != NEW.id;
      max_score := COALESCE(max_score, -1);
      IF NEW.score > max_score THEN
        NEW.is_best := TRUE;
        UPDATE debug_submissions
          SET is_best = FALSE
          WHERE 
            debug_problem_id = NEW.debug_problem_id
            AND user_id = NEW.user_id
            AND is_best = TRUE;
      ELSE
        NEW.is_best := FALSE;
      END IF;
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
  BEGIN
    SELECT debug_problems.min_diff INTO problem_min_diff FROM debug_problems WHERE NEW.debug_problem_id = debug_problems.id;
    SELECT submissions.score INTO sub_score FROM submissions WHERE NEW.sub_id = submissions.id;
    IF NEW.diff < problem_min_diff AND sub_score = 100::dbl_score THEN
      UPDATE debug_problems SET min_diff = NEW.diff WHERE NEW.debug_problem_id = debug_problems.id;
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