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

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';

import { projectsLoader } from 'pages/Projects/AllProjects/AllProjects.loader';
import PageLoader from 'components/atoms/PageLoader';
import { RegistryLayout } from 'components/organisms/RegistryLayout/RegistryLayout';
import { projectDetailsLoader } from 'components/templates/ProjectDetails/ProjectDetails.loader';

const AllProjects = lazy(() => import('../../pages/Projects/AllProjects'));
const ErrorPage = lazy(() => import('../../pages/ErrorPage'));
const Project = lazy(() => import('../../pages/Project'));
const Projects = lazy(() => import('../../pages/Projects'));

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
        <Route
          path="project/:projectId"
          element={<Project />}
          loader={projectDetailsLoader({
            queryClient: reactQueryClient,
            apolloClientFactory,
          })}
        />
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
      basename: import.meta.env.PUBLIC_URL,
    },
  );
};
