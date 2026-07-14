-- Drop trigger function
DROP FUNCTION "suzume"."s_update_score"() CASCADE;

-- Create trigger function and trigger
CREATE FUNCTION "suzume"."s_update_score"() RETURNS trigger SECURITY DEFINER AS 
  $trigger$
    BEGIN 
      UPDATE
        debug_submissions_diff dsd
      SET
        diff = dsd.diff
      FROM 
        debug_submissions ds
      WHERE
        ds.id = dsd.id
        AND ds.sub_id = NEW.id;
      RETURN NEW;
    END;
  $trigger$ LANGUAGE plpgsql;

CREATE TRIGGER "s_update_score_suzume"
  AFTER UPDATE OF score
  ON "public"."submissions"
  FOR EACH ROW
  EXECUTE FUNCTION "suzume"."s_update_score"();

