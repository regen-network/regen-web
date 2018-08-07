import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Auth from './Auth';
const supportsHistory = 'pushState' in window.history;

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const makeMainRoutes = () => {
  return (
    <Router component={App} forceRefresh={!supportsHistory}>
      <Switch>
        <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route exact path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Redirect to="/"/>
        }}/>
      </Switch>
    </Router>
  );
}

export default makeMainRoutes;
