import React from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { IntercomProvider } from 'react-use-intercom';

import { Auth0Provider } from '@auth0/auth0-react';
import { AuthApolloProvider } from './apollo';
import { LedgerProvider } from './ledger';
import { WalletProvider } from './wallet';
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <WalletProvider>
            <LedgerProvider>
              <ThemeProvider injectFonts>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <App />
              </ThemeProvider>
            </LedgerProvider>
          </WalletProvider>
        </MuiPickersUtilsProvider>
      </IntercomProvider>
    </AuthApolloProvider>
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
