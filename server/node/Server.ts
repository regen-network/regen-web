import * as express from 'express';
import {postgraphql} from 'postgraphql';

const app = express();

app.use(postgraphql('postgres://postgres@localhost:5432/xrn', 'public', {
  graphiql:true,
  watchPg: true,
  pgDefaultRole: 'guest',
  disableDefaultMutations: true
}));

app.listen(3001);
