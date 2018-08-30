create or replace function find_entries(polygon json) returns setof entry as $$
SELECT * FROM entry WHERE st_intersects(st_geomfromgeojson(find_entries.polygon::text), entry.polygon)
$$ language sql stable;

create index entry_polygon on entry using gist (polygon);
vacuum analyze entry (polygon);

--select st_asgeojson(polygon.geom) from polygon;
--explain analyze select find_entries('{"type":"Polygon","coordinates":[[[-0.268664522685526,51.5378483947973],[-0.282740755595086,51.5273834426515],[-0.26420132688375,51.5256746505787],[-0.255274935280227,51.5344315320896],[-0.268664522685526,51.5378483947973]]]}');
--explain analyze SELECT * FROM entry WHERE st_intersects(entry.polygon, st_geomfromgeojson('{"type":"Polygon","coordinates":[[[-0.268664522685526,51.5378483947973],[-0.282740755595086,51.5273834426515],[-0.26420132688375,51.5256746505787],[-0.255274935280227,51.5344315320896],[-0.268664522685526,51.5378483947973]]]}'))