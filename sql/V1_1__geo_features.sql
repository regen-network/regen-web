CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE ROLE app_user;

COMMENT ON ROLE app_user IS
  'This is the user role that all logged in users inherit from and should be used when creating role-level security policies.';

CREATE TABLE polygon
(
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  geom geometry('POLYGON') NOT NULL,
  owner text NOT NULL
);

ALTER TABLE polygon ENABLE ROW LEVEL SECURITY;

GRANT ALL ON polygon TO app_user;

CREATE POLICY polygon_owner_access ON polygon TO app_user
  USING (pg_has_role(owner, 'member'));

COMMENT ON POLICY polygon_owner_access ON polygon IS
  'This policy allows users to view and update polygons for their own user account and member orgs. pg_has_role allows the built-in postgres grant mechanism to be used for user/org inheritance relationships.';



-- CREATE ROLE aaronc;
--
-- GRANT app_user TO aaronc;
--
-- CREATE ROLE my_org;
-- CREATE ROLE another_org;
--
-- GRANT my_org TO aaronc;
--
-- SET ROLE 'aaronc';
--
-- INSERT INTO polygon
-- VALUES (DEFAULT,
--                             'a polygon',
--   ST_GeomFromGeoJSON('{"type": "Polygon","coordinates": [ [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ] ] }'),
--                             'my_org' );
--
-- INSERT INTO polygon
-- VALUES (DEFAULT,
--         'a polygon',
--         ST_GeomFromGeoJSON('{"type": "Polygon","coordinates": [ [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ] ] }'),
--         'another_org' );
--
-- SELECT * from polygon;
--
-- SET ROLE 'postgres';
