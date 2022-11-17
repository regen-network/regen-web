import { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { IntercomProvider } from 'react-use-intercom';
import amplitudePlugin from '@analytics/amplitude';
import googleAnalytics from '@analytics/google-analytics';
import { Auth0Provider } from '@auth0/auth0-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Analytics from 'analytics';
import doNotTrack from 'analytics-plugin-do-not-track';
import { AnalyticsProvider } from 'use-analytics';

import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

import PageLoader from 'components/atoms/PageLoader';

import { AuthApolloProvider } from './apollo';
import { LedgerProvider } from './ledger';
import { WalletProvider } from './lib/wallet/wallet';
import { router } from './routes';
import * as serviceWorker from './serviceWorker';

import './App.css';

const config = {
  domain:
    process.env.REACT_APP_AUTH0_DOMAIN || 'regen-network-registry.auth0.com',
  clientId:
    process.env.REACT_APP_AUTH0_CLIENT_ID || 'rEuc1WLPAQVXZ7gJrWg4AL9EhWMHmLu8',
  returnTo: window.location.origin || 'http://localhost:3000/',
  audience: 'https://regen-registry-server.herokuapp.com/',
};
const intercomId = process.env.REACT_APP_INTERCOM_APP_ID || '';
const queryClient = new QueryClient();

Sentry.init({
  dsn: 'https://f5279ac3b8724af88ffb4cdfad92a2d4@o1377530.ingest.sentry.io/6688446',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || 'development',
});

// our current analytics setup uses both amplitude and google analytics.
// our amplitude and GA have been set up with a development and production environment.
// for amplitude this means that we have a development and production API key.
// for GA this means that we have a development and production measurement id.
// be careful not to use the production API key or measurement id in a non-prod environment.
// but you can safely use the development API key and measurement id in non-prod environments.
// these values are safe to hardcode because they are public.
// also see the REACT_APP_ANALYTICS_ENABLED environment variable.
const DEVELOPMENT_AMPLITUDE_API_KEY = 'ef9a9d58cf90476430f62a634d72cd5c';
const DEVELOPMENT_GA_MEASUREMENT_ID = 'G-9ENS4JTCWY';
const analytics = Analytics({
  plugins: [
    doNotTrack(),
    amplitudePlugin({
      apiKey:
        process.env.REACT_APP_AMPLITUDE_API_KEY ||
        DEVELOPMENT_AMPLITUDE_API_KEY,
      // by default we will not track users, they must opt-in.
      enabled: false,
    }),
    googleAnalytics({
      measurementIds: [
        process.env.REACT_APP_GA_MEASUREMENT_ID ||
          DEVELOPMENT_GA_MEASUREMENT_ID,
      ],
      enabled: false,
      gtagConfig: {
        anonymize_ip: true,
      },
    }),
  ],
  // see here for debugging tools:
  // https://getanalytics.io/debugging/
  debug: process.env.NODE_ENV === 'development',
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
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
      <QueryClientProvider client={queryClient}>
        <IntercomProvider appId={intercomId} autoBoot>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <WalletProvider>
              <LedgerProvider>
                <ThemeProvider injectFonts>
                  <AnalyticsProvider instance={analytics}>
                    <Suspense fallback={<PageLoader />}>
                      <RouterProvider
                        router={router}
                        fallbackElement={<PageLoader />}
                      />
                    </Suspense>
                  </AnalyticsProvider>
                </ThemeProvider>
              </LedgerProvider>
            </WalletProvider>
          </LocalizationProvider>
        </IntercomProvider>
      </QueryClientProvider>
    </AuthApolloProvider>
  </Auth0Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
