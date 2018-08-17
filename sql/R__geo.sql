CREATE OR REPLACE FUNCTION public.polygon_geom_json(p public.polygon)
returns json as $$
  select to_json(st_asgeojson(p.geom));
$$ language sql stable ;

CREATE OR REPLACE FUNCTION public.create_polygon_by_json(name text, geojson json, owner text)
returns public.polygon as $$
  INSERT INTO polygon (name, geom, owner)
  VALUES (name, st_geomfromgeojson(geojson::text), COALESCE(owner, current_user))
  RETURNING *;
$$ language sql volatile ;
