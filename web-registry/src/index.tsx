import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'url-search-params-polyfill';
import './url-search-params-polyfill.d';

import { Auth0Provider } from '@auth0/auth0-react';
import { AuthApolloProvider } from './apollo';
// import history from './lib/history';

const config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || 'regen-network-registry.auth0.com',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'rEuc1WLPAQVXZ7gJrWg4AL9EhWMHmLu8',
  returnTo: window.location.href || 'http://localhost:3000/',
  audience: 'https://regen-registry-server.herokuapp.com/',
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={window.location.origin}
    // client_id={config.clientId}
    // redirect_uri={window.location.href}
    // onRedirectCallback={onRedirectCallback}
    // returnTo={config.returnTo}
    audience={config.audience}
  >
    <AuthApolloProvider>
      <ThemeProvider injectFonts>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthApolloProvider>
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
