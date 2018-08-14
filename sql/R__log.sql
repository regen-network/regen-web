CREATE OR REPLACE FUNCTION public.log_entry(type text, comment text, polygon json, point json, species text, unit text, numeric_value numeric)
  returns public.entry as $$
INSERT INTO entry (created_by, created_at, type, comment, polygon, point, species, unit, numeric_value)
VALUES (current_user, current_timestamp, type, comment, st_geomfromgeojson(polygon::text), st_geomfromgeojson(point::text), species, unit, numeric_value)
    RETURNING *;
-- "security definer" implies that the function gets called with the
-- permissions of the definer (the root user) and thus bypasseses RLS
$$ language sql volatile security definer;

COMMENT ON FUNCTION public.log_entry(type text, comment text, polygon json, point json, species text, unit text, numeric_value numeric) IS 'Inserts a log entry into the entry table';
