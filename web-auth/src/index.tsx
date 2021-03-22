import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ThemeProvider injectFonts>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
