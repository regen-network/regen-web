import * as express from 'express';
import * as path from 'path';
import {postgraphile} from 'postgraphile';

const app = express();

app.use(postgraphile(process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/xrn', 'public', {
  graphiql:true,
  watchPg: true,
  pgDefaultRole: 'guest',
  dynamicJson: true
}));

app.use(express.static(path.join(__dirname, '../web/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../web/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);

console.log("Started server on port " + port);
console.log("Graphiql UI at http://localhost:" + port + "/graphiql");