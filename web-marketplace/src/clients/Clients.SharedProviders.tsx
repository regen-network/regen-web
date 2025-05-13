import { Suspense, useEffect } from 'react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { IntercomProvider } from 'react-use-intercom';
import amplitudePlugin from '@analytics/amplitude';
import googleAnalytics from '@analytics/google-analytics';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Box } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Analytics from 'analytics';
import doNotTrack from 'analytics-plugin-do-not-track';
import { AnalyticsProvider } from 'use-analytics';

import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';

import { PropsWithChildren } from 'types/react/children';
import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';
import { useDefaultLocale } from 'lib/i18n/hooks/useDefaultLocale';

import PageLoader from 'components/atoms/PageLoader';

import { AuthApolloProvider } from '../apollo';

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

const analytics = Analytics({
  plugins: [
    doNotTrack(),
    amplitudePlugin({
      apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY,
      // by default we will not track users, they must opt-in.
      enabled: false,
    }),
    googleAnalytics({
      measurementIds: [import.meta.env.VITE_GA_MEASUREMENT_ID],
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

type Props = PropsWithChildren<{ customTheme?: Theme }>;

export const SharedProviders = ({ customTheme, children }: Props) => {
  useDefaultLocale();

  return (
    <QueryClientProvider client={reactQueryClient}>
      <AuthApolloProvider apolloClientFactory={apolloClientFactory}>
        <IntercomProvider appId={intercomId} autoBoot>
          <I18nProvider i18n={i18n}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <AnalyticsProvider instance={analytics}>
                <ThemeProvider customTheme={customTheme}>
                  <Suspense fallback={<PageLoader />}>{children}</Suspense>
                </ThemeProvider>
              </AnalyticsProvider>
            </LocalizationProvider>
          </I18nProvider>
        </IntercomProvider>
        <Box sx={{ displayPrint: 'none' }}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Box>
      </AuthApolloProvider>
    </QueryClientProvider>
  );
};
