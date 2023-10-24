import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { getRouter } from 'routes';

import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';

import PageLoader from 'components/atoms/PageLoader';
import * as serviceWorker from './serviceWorker';

import './App.css';
import '../../tailwind.css';
import { AppMiddleware } from './middleware';

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
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <AppMiddleware>
    <RouterProvider
      router={getRouter({
        reactQueryClient,
        apolloClientFactory,
      })}
      fallbackElement={<PageLoader />}
    />
  </AppMiddleware>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
