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
import escape from 'pg-escape';

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


app.post('/argtest', (req, res) => {
    pgPool.connect((err, client, release) => {
      if(err) {
        res.sendStatus(500);
        console.error('Error acquiring postgres client', err.stack);
// the next two lines work as expected. Can't use SET ROLE with an argument.
//      } else client.query('SELECT id FROM polygon WHERE 1 = $1', [1], (err, qres) => {
//        } else client.query('SELECT id FROM polygon WHERE name = $1', ['squatney'], (err, qres) => {
      } else client.query('SET ROLE $1', ['google-oauth2|113866112308051151519'], (err, qres) => {
          release();
        if(err) {
          res.sendStatus(500);
          console.error(err.stack);
        } else {
            console.log("ARG TEST WORKED!");
            res.sendStatus(200);
        }
      });
    });
});


app.post('/upload', (req, res) => {

    if (!req.files)
        return res.status(400).send('No files were uploaded.\n');

    const uploadFile = req.files.file
    const fileName = req.files.file.name

    if (req.body && req.body.accessToken) {
      const owner = req.body.accessToken;
      // call SET ROLE on accessToken
      console.log("owner=",owner);
      const dom = (new xmldom.DOMParser()).parseFromString(uploadFile.data.toString('utf8'), 'text/xml');
      const featuresCollection = togeojson.kml(dom);
      const features = featuresCollection && featuresCollection.features;
      pgPool.connect((err, client, release) => {
          if(err) {
              res.sendStatus(500);
              console.error('Error acquiring postgres client', err.stack);
          }else{
              /*
//              client.query('SET ROLE "google-oauth2|113866112308051151519"',[], (err, qres) => {
//              client.query('SET ROLE $1', ['google-oauth2|113866112308051151519'], (err, qres) => {
              var q = {
                  //text: 'SET ROLE $1::text',
                  text: 'SET ROLE $1',
                  values: ['google-oauth2|113866112308051151519']
              };
              client.query(q, (err, qres) => {
                  // release();
                  if(err) {
                      res.sendStatus(500);
                      console.error('Error setting role', err.stack);
                  }
              });
              */
              const xml = new xmldom.XMLSerializer();
              features.forEach((feature) => {
//                const geometry = feature && feature.geometry;
//                console.log("geometry=",geometry);

                const name = feature && feature.properties && feature.properties.name;
                console.log("name=",name);
                  const geomElem = dom.getElementsByTagName('Polygon')[0];
                  const geomString  = xml.serializeToString(geomElem);
//                  console.log("s=",s);
//                  client.query('SELECT * FROM polygon', [], (err, qres) => {
//                  client.query('INSERT INTO polygon(id,name,geom,owner) VALUES(NULL,$1,ST_GeomFromGeoJSON(ST_Force2D($2)),$3)', [name,geometry,owner], (err, qres) => {
//                  client.query('INSERT INTO polygon(id,name,geom,owner) VALUES(NULL,$1,ST_GeomFromKML($2),$3)', [name,geometry,owner], (err, qres) => {
                  //client.query('INSERT INTO polygon(id,name,geom,owner) VALUES(NULL,$1,(ST_GeomFromKML(ST_Force2D($2))),$3)', [name,s,owner], (err, qres) => {
                  client.query('SELECT ST_GeomFromKML($1)', [geomString], (err, qres) => {
                      if(err) {
                          res.sendStatus(500);
                          console.error('Error SELECT', err.stack);
                      }else{
                          const geom = qres.rows[0].st_geomfromkml;
                          console.log("geom =",geom);
                          client.query('INSERT INTO polygon(name,geom,owner) VALUES($1,ST_Force2D($2),$3)', [name,geom,owner], (err, qres) => {
                              if(err) {
                                res.sendStatus(500);
                                console.error('Error SELECT', err.stack);
                              }else{
                                  console.log("hooray!");
                                  res.sendStatus(200);
                              }
                          });
                      }
                  });
              }); //forEach
              release();
          }
      });

//      res.sendStatus(200);

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
