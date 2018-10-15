import * as express from 'express';
import * as path from 'path';
import { Pool, Client } from 'pg';
import { parse as parsePgConnectionString } from 'pg-connection-string';
import { postgraphile } from 'postgraphile';
import * as jwks from 'jwks-rsa';
import * as jwt from 'express-jwt';
import * as childProcess from 'child_process';
import * as fileUpload from 'express-fileupload';
import * as xmldom from 'xmldom';
import * as togeojson from '@mapbox/togeojson';
import * as cors from 'cors';
import { release } from 'os';
import * as unzipper from 'unzipper';

import * as fs from 'fs';
import * as etl from 'etl';
import { Readable } from 'stream';

const app = express();

app.use(express.static(path.join(__dirname, '../web/build')));
app.use(fileUpload());

app.use(cors());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../web/build', 'index.html'));
});

app.use(jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://regen-network.auth0.com/.well-known/jwks.json"
  }),
  credentialsRequired: false,
  audience: 'https://app.regen.network/graphql',
  issuer: "https://regen-network.auth0.com/",
  algorithms: ['RS256']
}));

const pgPool = new Pool(
  parsePgConnectionString(
    process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/xrn'));

pgPool.connect((err, client, release) => {
  if(err)
    return;
  release();
  try {
    console.log("Calling Flyway")
    const host = process.env.POSTGRES_HOST || 'localhost';
    const port = process.env.POSTGRES_PORT || '5432';
    const db = process.env.POSTGRES_DATABASE || 'xrn';
    const user = process.env.POSTGRES_USER || 'postgres';
    const password = process.env.POSTGRES_PASSWORD || '';
    const flywayBin = path.join(__dirname, "../node_modules/.bin/flyway");
    const flywayCmd =
      `${flywayBin} migrate -url="jdbc:postgresql://${host}:${port}/${db}" -user=${user} -password=${password}`;
    childProcess.exec(flywayCmd, {}, (err, stdout, stderr) => {
      if(err) console.error(err);
      if(stderr) console.error(stderr);
      console.log(stdout);
    });
  } catch(e) {
    console.error(e);
  }
});

app.post('/api/login', (req, res) => {
  // Create Postgres ROLE for Auth0 user
  if(req.user && req.user.sub) {
    const sub = req.user.sub;
    pgPool.connect((err, client, release) => {
      if(err) {
        res.sendStatus(500);
        console.error('Error acquiring postgres client', err.stack);
      } else client.query('SELECT private.create_app_user_if_needed($1)', [sub], (err, qres) => {
        release();
        if(err) {
          res.sendStatus(500);
          console.error('Error creating role', err.stack);
        } else res.sendStatus(200);
      });
    });
  } else res.sendStatus(200);
});

/*
  This /upload endpoint does a lot, so it's worth noting up front the processing steps.

  In broad terms, we need to collect three fields from the input then insert them in the polygon table.
  The columns are owner, name, and geom, where:
    owner = Auth0 accessToken,
    name = feature name (name of the polygon defined with GoogleEarth)
    geom = polygon coordinates in 2d postgis geom format 

  The file data, a .kmz file, is a zipped file containing an XML/KML file called doc.kml.
  ├── Foo.kmz
      ├── doc.kml

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
*/
app.post('/upload', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.\n');

    const uploadFile = req.files.file;

    const stream = new Readable({
        read() {}
    });

    stream.push(uploadFile.data);
// 1. unzip the file
    stream.pipe(unzipper.Parse())
        .pipe(etl.map(entry => {
            if (entry.path == "doc.kml")
                entry
                .buffer()
                .then(function(docKml) {
                    if (req.body && req.body.accessToken) {
// 2. get the owner
                        const owner = req.body.accessToken;
// 3. XML to DOM
                        const dom = (new xmldom.DOMParser()).parseFromString(docKml.toString('utf8'),'text/xml');
// 4. get the features
                        const featuresCollection = togeojson.kml(dom);
                        const features = featuresCollection && featuresCollection.features;
// 5. db connect
                        pgPool.connect((err, client, release) => {
                            if(err) {
                                res.sendStatus(500);
                                console.error('Error acquiring postgres client', err.stack);
                            }else{
                                const xml = new xmldom.XMLSerializer();
// 6. loop thru features
                                features.forEach((feature) => {
// 6a. get name
                                    const name = feature && feature.properties && feature.properties.name;
// 6b. get polygon
                                    const geomElem = dom.getElementsByTagName('Polygon')[0];
                                    const geomString  = xml.serializeToString(geomElem);
// 6c. use postgis to convert the XML string to binary postgis geom format
                                    client.query('SELECT ST_GeomFromKML($1)', [geomString], (err, qres) => {
                                        if(err) {
                                            res.sendStatus(500);
                                            console.error('Error getting geometry from KML input file.', err.stack);
                                        }else{
                                            const geom = qres.rows[0].st_geomfromkml; // the binary geom data that the query needs
// 6d. insert, use ST_Force2D() to get rid of the Z-dimension in the KML
// Note that this INSERT query is nested within the SELECT above.
                                            client.query('INSERT INTO polygon(name,geom,owner) VALUES($1,ST_Force2D($2),$3)', [name,geom,owner], (err, qres) => {
                                                if(err) {
                                                    res.sendStatus(500);
                                                    console.error('Error on INSERT', err.stack);
                                                }else{
// 7. all good, send 200
                                                    res.sendStatus(200);
                                                }
                                            });
                                        }
                                    });
                                }); //forEach
                            }
// 8. cleanup
                            release();
                        })
                    }
                });
            else
// from unzipper, returns an empty stream that provides 'error' and 'finish' events. Not yet implemented.
                entry.autodrain();
        }));
});

app.use(postgraphile(pgPool, 'public', {
  graphiql: true,
  watchPg: true,
  dynamicJson: true,
  pgSettings: (req) => {
    if(req.user && req.user.sub) {
      const { sub, ...user } = req.user;
      const settings = { role: sub };
      // TODO need to deal with keys that aren't strings properly
      // Object.keys(user).map(k =>
      //   settings['jwt.claims.' + k] = user[k]
      // );
      return settings;
    } else return { role: 'guest' };
   } 
}));


const port = process.env.PORT || 5000;

app.listen(port);

console.log("Started server on port " + port);
console.log("Graphiql UI at http://localhost:" + port + "/graphiql");
