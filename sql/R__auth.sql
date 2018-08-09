CREATE OR REPLACE FUNCTION private.create_app_user_if_needed(role text)
returns void as $$
begin
  IF NOT EXISTS (
      SELECT
      FROM   pg_catalog.pg_roles
      WHERE  rolname = role) THEN
        EXECUTE format('CREATE ROLE %I', role);
        EXECUTE format('GRANT app_user TO %I', role);
   END IF;
end;
$$ language plpgsql;

CREATE OR REPLACE FUNCTION public.get_current_user() RETURNS TEXT AS $$
  SELECT current_user::text;
$$ LANGUAGE SQL STABLE;

-- Test cases:
-- select private.create_app_user_if_needed('test1');
-- set role test1;
-- set role postgres;
-- drop role test1;

