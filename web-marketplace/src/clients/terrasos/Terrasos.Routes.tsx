import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  redirect,
  Route,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { Router } from '@remix-run/router';
import * as Sentry from '@sentry/react';
import { QueryClient } from '@tanstack/react-query';
import { projectsLoader } from 'legacy-pages/Projects/AllProjects/AllProjects.loader';
import { safeLazy } from 'utils/safeLazy';

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';

import PageLoader from 'components/atoms/PageLoader';
import { RegistryLayout } from 'components/organisms/RegistryLayout/RegistryLayout';

const AllProjects = safeLazy(
  () => import('../../legacy-pages/Projects/AllProjects'),
);
const ErrorPage = lazy(() => import('../../legacy-pages/ErrorPage'));
const Projects = safeLazy(() => import('../../legacy-pages/Projects'));

type RouterProps = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
};

export default function TerrasosRoutes({
  reactQueryClient,
  apolloClientFactory,
}: RouterProps): JSX.Element {
  // Sets React Router’s basename to the current locale (e.g., /en, /es)
  // so all legacy React Router paths (/, /projects, etc.) resolve under /{lang}.
  // TODO: Remove `basename` when the legacy React Router is fully migrated
  // to Next’s App Router and no React Router routes remain.
  const basename =
    typeof window !== 'undefined'
      ? (() => {
          const segment = window.location.pathname.split('/')[1];
          return segment === 'en' || segment === 'es' ? `/${segment}` : '';
        })()
      : '';
  return (
    <RouterProvider
      router={getRouter({
        reactQueryClient,
        apolloClientFactory,
        basename,
      })}
      fallbackElement={<PageLoader />}
    />
  );
}

type RouterParams = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
  basename?: string;
};

export const getTerrasosRoutes = ({
  reactQueryClient,
  apolloClientFactory,
}: RouterParams): RouteObject[] => {
  return createRoutesFromElements(
    <Route element={<RegistryLayout />}>
      <Route path="/" element={<Outlet />} errorElement={<ErrorPage />}>
        <Route
          index
          element={<Projects />}
          loader={() => {
            return redirect('/projects/1');
          }}
        />
        <Route path="projects" element={<Projects />}>
          <Route index element={<Navigate to="1" />} />
          <Route
            path=":page"
            element={<AllProjects />}
            loader={projectsLoader({
              queryClient: reactQueryClient,
            })}
          />
        </Route>
      </Route>
    </Route>,
  );
};

export const getRouter = ({
  reactQueryClient,
  apolloClientFactory,
  basename = '',
}: RouterParams): Router => {
  const sentryCreateBrowserRouter =
    Sentry.wrapCreateBrowserRouter(createBrowserRouter);
  return sentryCreateBrowserRouter(
    getTerrasosRoutes({ reactQueryClient, apolloClientFactory }),
    {
      basename,
    },
  );
};
