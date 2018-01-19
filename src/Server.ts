import * as express from 'express';
import * as postgraphql from 'postgraphql';

const app = express();

app.use(postgraphql('postgres://localhost:5432'));

app.listen(3001);
