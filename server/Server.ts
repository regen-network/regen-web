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


app.post('/upload', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.\n');

    const uploadFile = req.files.file
    const fileName = req.files.file.name

    if (req.body && req.body.accessToken) {
      const owner = req.body.accessToken;
      const dom = (new xmldom.DOMParser()).parseFromString(uploadFile.data.toString('utf8'), 'text/xml');
      const featuresCollection = togeojson.kml(dom);
      const features = featuresCollection && featuresCollection.features;
      pgPool.connect((err, client, release) => {
          if(err) {
              res.sendStatus(500);
              console.error('Error acquiring postgres client', err.stack);
          }else{
/*
These next few lines are silly, because featuresCollection already holds the geometery data.
The problem is that I had problems getting ST_GeomFromGeoJSON() to work as expected, while
ST_GeomFromKML() works. This is meant to explain why I'm converting a piece of the dom back
to an XML string. It seems wasteful and stupid because the original data is already XML.
May investigate later.
 */
              const xml = new xmldom.XMLSerializer();
              features.forEach((feature) => {
                const name = feature && feature.properties && feature.properties.name;
                // Will probably need to go one level higher to get features other than type Polygon
                const geomElem = dom.getElementsByTagName('Polygon')[0];
                const geomString  = xml.serializeToString(geomElem);

                client.query('SELECT ST_GeomFromKML($1)', [geomString], (err, qres) => {
                    if(err) {
                        res.sendStatus(500);
                        console.error('Error getting geometry from KML input file.', err.stack);
                    }else{
                        const geom = qres.rows[0].st_geomfromkml; // the binary geom data that the query needs
                        // ST_Force2D() the input to get rid of the Z-dimension in KML
                        client.query('INSERT INTO polygon(name,geom,owner) VALUES($1,ST_Force2D($2),$3)', [name,geom,owner], (err, qres) => {
                          if(err) {
                            res.sendStatus(500);
                            console.error('Error SELECT', err.stack);
                          }else{
                            res.sendStatus(200);
                          }
                        });
                    }
                 });
               }); //forEach
               release();
          }
       });
    } else res.sendStatus(400);
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
