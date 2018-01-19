import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        </Router>
    );
  }
}

export default App;
