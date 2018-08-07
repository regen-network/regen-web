import * as express from 'express';
import * as path from 'path';
import {postgraphile} from 'postgraphile';
import * as jwks from 'jwks-rsa';
import * as jwt from 'express-jwt';

const app = express();

app.use(express.static(path.join(__dirname, '../web/build')));

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

app.get('/test', (req, res) => {
  res.send(JSON.stringify(req.user));
});

app.use(postgraphile(process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/xrn', 'public', {
  graphiql:true,
  watchPg: true,
  dynamicJson: true,
  pgSettings: (req) => {
    console.log(req.user);
    const sub = req.user.sub;
    // TODO create pg role from sub
    return {
      role: sub || 'guest'
    };
  }
}));

const port = process.env.PORT || 5000;

app.listen(port);

console.log("Started server on port " + port);
console.log("Graphiql UI at http://localhost:" + port + "/graphiql");