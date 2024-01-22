import './index.css';

import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHAV3_SITE_KEY}>
    <ThemeProvider injectFonts>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </GoogleReCaptchaProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(consolle.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
