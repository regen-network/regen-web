import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './App';

const makeMainRoutes = (history) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={(props) => <App {...props} />} />
      </Switch>
    </Router>
  );
}

export default makeMainRoutes;
