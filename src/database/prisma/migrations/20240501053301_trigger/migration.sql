-- Trigger function for updating debug submissions when min_diff is updated
CREATE OR REPLACE FUNCTION "suzume"."debug_problems_update_min_diff"() RETURNS trigger AS
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

CREATE OR REPLACE TRIGGER "debug_problems_update_min_diff" 
  AFTER UPDATE OF min_diff 
  ON debug_problems
  FOR EACH ROW 
  EXECUTE FUNCTION "suzume"."debug_problems_update_min_diff"();  

-- Trigger function for updating debug submissions when diff is updated
CREATE OR REPLACE FUNCTION "suzume"."debug_sub_update_diff"() RETURNS trigger AS
  $trigger$
  DECLARE 
    problem_min_diff integer;
    sub_score DECIMAL(9,2);
    sub_result submission_result;
  BEGIN
    SELECT debug_problems.min_diff INTO problem_min_diff FROM debug_problems WHERE NEW.debug_problem_id = debug_problems.id;
    SELECT submissions.score, submissions.result INTO sub_score, sub_result FROM submissions WHERE NEW.sub_id = submissions.id;
    IF NEW.diff < problem_min_diff AND sub_score = 100::dbl_score THEN
      UPDATE debug_problems SET min_diff = NEW.diff WHERE NEW.debug_problem_id = debug_problems.id;
    ELSE
      UPDATE debug_submissions 
        SET 
          score = sub_score * CASE 
            WHEN NEW.diff - problem_min_diff <= 0 THEN 1
            WHEN NEW.diff - problem_min_diff >= 20 THEN 0
            ELSE 1 - (NEW.diff - problem_min_diff)::numeric / 20
          END,
          result = CASE
            WHEN sub_score = 100 AND NEW.diff - problem_min_diff <= 0 THEN 'AC'::submission_result
            WHEN sub_score = 100 THEN 'SS'::submission_result
            ELSE sub_result
          END
        WHERE NEW.id = id;
    END IF;
    RETURN NEW;
  END;
  $trigger$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER "debug_sub_update_diff" 
  AFTER UPDATE OF diff 
  ON debug_submissions
  FOR EACH ROW 
  EXECUTE FUNCTION "suzume"."debug_sub_update_diff"();  


