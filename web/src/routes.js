import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
const supportsHistory = 'pushState' in window.history;

const makeMainRoutes = (auth) => {
  return (
    <Router component={App} forceRefresh={!supportsHistory}>
      <Switch>
        <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
      </Switch>
    </Router>
  );
}

export default makeMainRoutes;
