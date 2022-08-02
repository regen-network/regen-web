import React from 'react';
import ReactDOM from 'react-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { IntercomProvider } from 'react-use-intercom';
import { Auth0Provider } from '@auth0/auth0-react';

import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthApolloProvider } from './apollo';
import { LedgerProvider } from './ledger';
import { WalletProvider } from './lib/wallet';
// import history from './lib/history';

const config = {
  domain:
    process.env.REACT_APP_AUTH0_DOMAIN || 'regen-network-registry.auth0.com',
  clientId:
    process.env.REACT_APP_AUTH0_CLIENT_ID || 'rEuc1WLPAQVXZ7gJrWg4AL9EhWMHmLu8',
  returnTo: window.location.origin || 'http://localhost:3000/',
  audience: 'https://regen-registry-server.herokuapp.com/',
};

const intercomId = process.env.REACT_APP_INTERCOM_APP_ID || '';

// const onRedirectCallback = (appState: AppState) => {
//   // If using a Hash Router, you need to use window.history.replaceState to
//   // remove the `code` and `state` query parameters from the callback url.
//   // window.history.replaceState({}, document.title, window.location.pathname);
//   history.replace((appState && appState.returnTo) || window.location.pathname);
// };

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={window.location.origin}
    // onRedirectCallback={onRedirectCallback}
    // returnTo={config.returnTo}
    useRefreshTokens={true}
    audience={config.audience}
    cacheLocation="localstorage"
  >
    <AuthApolloProvider>
      <IntercomProvider appId={intercomId} autoBoot>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <WalletProvider>
            <LedgerProvider>
              <ThemeProvider injectFonts>
                <App />
              </ThemeProvider>
            </LedgerProvider>
          </WalletProvider>
        </LocalizationProvider>
      </IntercomProvider>
    </AuthApolloProvider>
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
