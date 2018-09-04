create or replace function find_entries(polygon json) returns setof entry as $$
SELECT * FROM entry WHERE st_intersects(st_geomfromgeojson(find_entries.polygon::text), entry.polygon)
$$ language sql stable;

create index entry_polygon on entry using gist (polygon);
