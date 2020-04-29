import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from 'web-components/lib/components/footer';
import Header from 'web-components/lib/components/header';
import Home from './pages/Home';
import Buyers from './pages/Buyers';
import LandStewards from './pages/LandStewards';
import Developers from './pages/Developers';
import Science from './pages/Science';
let logo = './assets/logo.svg';

// import { ApolloProvider } from '@apollo/react-hooks';
// import ApolloClient from 'apollo-boost';

ReactDOM.render(
  <ThemeProvider injectFonts>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Router>
      <div>
        <Header logo={logo}></Header>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/buyers">
            <Buyers />
          </Route>
          <Route path="/landstewards">
            <LandStewards />
          </Route>
          <Route path="/developers">
            <Developers />
          </Route>
          <Route path="/science">
            <Science />
          </Route>
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
