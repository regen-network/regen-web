#re regen.network MVP Server Code

## Starting PostgreSQL Locally

1. Install [docker-compose](https://docs.docker.com/compose/install/)
2. Run `docker-compose up`

## Run Server

1. Run `yarn`
2. Run `yarn start`


## Notes on upload endpoint
```
  This /upload endpoint does a lot, so it's worth noting the processing steps up front in order
  to keep from going insane as you read the code.

  In broad terms, we need to collect three fields from the input then insert them in the polygon table.
  The columns are owner, name, and geom, where:
    owner = Auth0 accessToken,
    name = feature name (name of the polygon defined with GoogleEarth)
    geom = polygon coordinates in 2d postgis geom format 

 The file data, a .kmz file, is a zipped file containing an XML/KML file called doc.kml.
  Foo.kmz
  ├── doc.kml
      ETL pipeline: stream - from raw uploaded file
      ├── unzip the file, get the XML data (doc.kml)
          ├── loop thru geojson features
              ├── outer query - transform XML features to postgis, ST_GeomFromKML()
                  ├── inner query - INSERT INTO polygon...
```

  Steps:
  1. Unzips input file and streams to a buffer that contains the doc.xml dat,
  2. then get the accessToken (owner column),
  3. parse the XML data into a DOM object,
  4. pull the features out of the GeoJSON,
  5. get a db connection from the pool,
  6. loop thru the features
    a) get the name (name column),
    b) get the Polygon element from the DOM,
    c) convert this element /back/ to XML (necessary due to problems with ST_GeomFromGeoJSON() -- using ST_GeomFromKML() instead)
    d) INSERT owner,name,geom,
  7. send the 200 OK response
  8. release the db connection

