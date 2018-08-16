import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './App';

const makeMainRoutes = (auth, history) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
      </Switch>
    </Router>
  );
}

export default makeMainRoutes;
