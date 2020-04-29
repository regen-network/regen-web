import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

import logo from './assets/logo.png';

import './App.css';
import Footer from 'web-components/lib/components/footer';
import Header from 'web-components/lib/components/header';
import Home from './pages/Home';
import Buyers from './pages/Buyers';
import LandStewards from './pages/LandStewards';
import Developers from './pages/Developers';
import Science from './pages/Science';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <div>
        <Header logo={logo}>
          <NavBar />
        </Header>
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
  );
};

export default App;
