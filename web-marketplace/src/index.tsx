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
import { wallets } from '@cosmos-kit/keplr-mobile';
import { ChainProvider } from '@cosmos-kit/react-lite';
import { Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Analytics from 'analytics';
import doNotTrack from 'analytics-plugin-do-not-track';
import { assets, chains } from 'chain-registry';
import { getRouter } from 'routes';
import { AnalyticsProvider } from 'use-analytics';

import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';
import {
  WALLET_CONNECT_RELAY_URL,
  walletConnectClientMeta,
} from 'lib/wallet/wallet.constants';

import PageLoader from 'components/atoms/PageLoader';

import { AuthApolloProvider } from './apollo';
import { LedgerProvider } from './ledger';
import { WalletProvider } from './lib/wallet/wallet';
import * as serviceWorker from './serviceWorker';

import './App.css';

const intercomId = import.meta.env.VITE_INTERCOM_APP_ID || '';

// by default do not enable sentry unless the flag is set.
// this reduces our monthly usage which can quickly run out if this is not set.
// you can set this flag in local environments if testing changes to sentry.
// currently we only want this flag set for the production environment.
if (import.meta.env.VITE_SENTRY_ENABLED) {
  const defaultSampleRate = '0.2';
  const tracesSampleRate = parseFloat(
    import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || defaultSampleRate,
  );
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
    tracesSampleRate,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development',
  });
}

// our current analytics setup uses both amplitude and google analytics.
// our amplitude and GA have been set up with a development and production environment.
// for amplitude this means that we have a development and production API key.
// for GA this means that we have a development and production measurement id.
// be careful not to use the production API key or measurement id in a non-prod environment.
// but you can safely use the development API key and measurement id in non-prod environments.
// these values are safe to hardcode because they are public.
// also see the VITE_ANALYTICS_ENABLED environment variable.
const DEVELOPMENT_AMPLITUDE_API_KEY = 'ef9a9d58cf90476430f62a634d72cd5c';
const DEVELOPMENT_GA_MEASUREMENT_ID = 'G-9ENS4JTCWY';
const analytics = Analytics({
  plugins: [
    doNotTrack(),
    amplitudePlugin({
      apiKey:
        import.meta.env.VITE_AMPLITUDE_API_KEY || DEVELOPMENT_AMPLITUDE_API_KEY,
      // by default we will not track users, they must opt-in.
      enabled: false,
    }),
    googleAnalytics({
      measurementIds: [
        import.meta.env.VITE_GA_MEASUREMENT_ID || DEVELOPMENT_GA_MEASUREMENT_ID,
      ],
      enabled: false,
      gtagConfig: {
        anonymize_ip: true,
      },
    }),
  ],
  // see here for debugging tools:
  // https://getanalytics.io/debugging/
  debug: import.meta.env.NODE_ENV === 'development',
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <QueryClientProvider client={reactQueryClient}>
    <AuthApolloProvider apolloClientFactory={apolloClientFactory}>
      <IntercomProvider appId={intercomId} autoBoot>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AnalyticsProvider instance={analytics}>
            <ChainProvider
              chains={chains.filter(chain => chain.chain_name === 'regen')}
              assetLists={assets.filter(chain => chain.chain_name === 'regen')}
              wallets={wallets}
              walletConnectOptions={{
                signClient: {
                  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
                  relayUrl: WALLET_CONNECT_RELAY_URL,
                  metadata: walletConnectClientMeta,
                },
              }}
            >
              <WalletProvider>
                <LedgerProvider>
                  <ThemeProvider>
                    <Suspense fallback={<PageLoader />}>
                      <RouterProvider
                        router={getRouter({
                          reactQueryClient,
                          apolloClientFactory,
                        })}
                        fallbackElement={<PageLoader />}
                      />
                    </Suspense>
                  </ThemeProvider>
                </LedgerProvider>
              </WalletProvider>
            </ChainProvider>
          </AnalyticsProvider>
        </LocalizationProvider>
      </IntercomProvider>
      <Box sx={{ displayPrint: 'none' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Box>
    </AuthApolloProvider>
  </QueryClientProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
