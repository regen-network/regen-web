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

const app = express();

app.use(express.static(path.join(__dirname, '../web/build')));
app.use(fileUpload());


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

    if (req.user && req.user.sub) {
        const sub = req.user.sub;
        // call SET ROLE on sub
        console.log("req.user.sub=",req.user.sub);
    }

/*
    We're processing the stream, not uploading the file.

    uploadFile.mv(`${__dirname}/public/files/${fileName}`, function (err) {
      if (err)
        return res.status(500).send(err);

      res.send("File uploaded!");
    });
*/

    const dom = (new xmldom.DOMParser()).parseFromString(uploadFile.data.toString('utf8'), 'text/xml');
    const featuresCollection = togeojson.kml(dom);
    const features = featuresCollection && featuresCollection.features;
    features.forEach((feature) => {
        const geometry = feature && feature.geometry;
        const name = feature && feature.properties && feature.properties.name;

//        console.log("feature.geometry.coordinates=",feature.geometry.coordinates);
        console.log("name=",name);
    });


    res.sendStatus(200);
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
