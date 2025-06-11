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
const Project = safeLazy(() => import('../../legacy-pages/Project'));
const Projects = safeLazy(() => import('../../legacy-pages/Projects'));

type RouterProps = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
};

export const TerrasosRoutes = ({
  reactQueryClient,
  apolloClientFactory,
}: RouterProps) => {
  return (
    <RouterProvider
      router={getRouter({
        reactQueryClient,
        apolloClientFactory,
      })}
      fallbackElement={<PageLoader />}
    />
  );
};

type RouterParams = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
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
}: RouterParams): Router => {
  const sentryCreateBrowserRouter =
    Sentry.wrapCreateBrowserRouter(createBrowserRouter);
  return sentryCreateBrowserRouter(
    getTerrasosRoutes({ reactQueryClient, apolloClientFactory }),
    {
      basename: process.env.PUBLIC_URL,
    },
  );
};
