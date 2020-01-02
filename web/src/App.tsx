import React from 'react';
import logo from './logo.svg';
import './App.css';
import Title from 'web-components/lib/components/title';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider injectFonts>
      <div className="App">
        <header className="App-header">
          <Title variant="h1">Sheok Hill</Title>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
      </ThemeProvider>
  );
};

export default App;
