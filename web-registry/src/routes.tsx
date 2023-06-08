import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouteObject,
} from 'react-router-dom';
import { Router } from '@remix-run/router';
import * as Sentry from '@sentry/react';
import { QueryClient } from '@tanstack/react-query';

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';

import { CertificatePage } from 'pages/Certificate/Certificate';
import MyBridge from 'pages/Dashboard/MyBridge';
import { MyBridgableEcocreditsTable } from 'pages/Dashboard/MyBridge/MyBridge.BridgableEcocreditsTable';
import { MyBridgedEcocreditsTable } from 'pages/Dashboard/MyBridge/MyBridge.BridgedEcocreditsTable';
import MyCreditBatches from 'pages/Dashboard/MyCreditBatches';
import MyCreditClasses from 'pages/Dashboard/MyCreditClasses';
import MyEcocredits from 'pages/Dashboard/MyEcocredits';
import MyProjects from 'pages/Dashboard/MyProjects';
import { ecocreditBatchesLoader } from 'pages/EcocreditBatches/EcocreditBatches.loader';
import { BridgeTab } from 'pages/EcocreditsByAccount/BridgeTab/BridgeTab';
import { PortfolioTab } from 'pages/EcocreditsByAccount/PortfolioTab/EcocreditsByAccount.PortfolioTab';
import { homeLoader } from 'pages/Home/Home.loader';
import { storefrontLoader } from 'pages/Marketplace/Storefront/Storefront.loader';
import { projectsLoader } from 'pages/Projects/Projects.loader';
import { RegistryLayout } from 'components/organisms/RegistryLayout/RegistryLayout';
import { projectDetailsLoader } from 'components/templates/ProjectDetails/ProjectDetails.loader';

import { KeplrRoute } from './components/atoms';
import { ProjectMetadata } from './pages/ProjectMetadata/ProjectMetadata';

const Additionality = lazy(() => import('./pages/Additionality'));
const BasicInfo = lazy(() => import('./pages/BasicInfo'));
const BatchDetails = lazy(() => import('./pages/BatchDetails'));
const BasketDetails = lazy(() => import('./pages/BasketDetails'));
const BuyersPage = lazy(() => import('./pages/Buyers'));
const ChooseCreditClassPage = lazy(() => import('./pages/ChooseCreditClass'));
const CreateCreditClassInfo = lazy(
  () => import('./pages/CreateCreditClassInfo'),
);
const CreateCreditClass = lazy(() => import('./pages/CreateCreditClass'));
const CreateMethodology = lazy(() => import('./pages/CreateMethodology'));
const CreditClassDetails = lazy(() => import('./pages/CreditClassDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Description = lazy(() => import('./pages/Description'));
const EcocreditBatches = lazy(() => import('./pages/EcocreditBatches'));
const EcocreditsByAccount = lazy(() => import('./pages/EcocreditsByAccount'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const Home = lazy(() => import('./pages/Home'));
const LandStewards = lazy(() => import('./pages/LandStewards'));
const Media = lazy(() => import('./pages/Media'));
const MethodologyDetails = lazy(() => import('./pages/MethodologyDetails'));
const MethodologyReviewProcess = lazy(
  () => import('./pages/MethodologyReviewProcess'),
);
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const Project = lazy(() => import('./pages/Project'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectCreate = lazy(() => import('./pages/ProjectCreate'));
const ProjectFinished = lazy(() => import('./pages/ProjectFinished'));
const ProjectLocation = lazy(() => import('./pages/ProjectLocation'));
const ProjectReview = lazy(() => import('./pages/ProjectReview'));
const Roles = lazy(() => import('./pages/Roles'));
const Story = lazy(() => import('./pages/Story'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ProjectEdit = lazy(() => import('./pages/ProjectEdit'));
const Activity = lazy(() => import('./pages/Activity'));
const CreateBatch = lazy(() => import('./pages/CreateBatch'));
const Storefront = lazy(() => import('./pages/Marketplace/Storefront'));
const ConnectWalletPage = lazy(() => import('./pages/ConnectWalletPage'));
const ProfileEdit = lazy(() => import('./pages/ProfileEdit'));

type RouterParams = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
};

export const getRoutes = ({
  reactQueryClient,
  apolloClientFactory,
}: RouterParams): RouteObject[] => {
  return createRoutesFromElements(
    <Route element={<RegistryLayout />}>
      <Route path="/" element={<Outlet />} errorElement={<ErrorPage />}>
        <Route
          index
          element={<Home />}
          loader={homeLoader({
            queryClient: reactQueryClient,
          })}
        />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="add" element={<Additionality />} />
        <Route path="buyers" element={<BuyersPage />} />
        <Route path="create-methodology" element={<CreateMethodology />} />
        <Route
          // TODO: thould this route be moved to /credit-classes?
          path="create-credit-class"
          element={<CreateCreditClassInfo />}
        />
        <Route path="project-developers" element={<LandStewards />} />
        <Route
          path="methodology-review-process"
          element={<MethodologyReviewProcess />}
        />
        <Route
          path="projects/:page"
          element={<Projects />}
          loader={projectsLoader({
            queryClient: reactQueryClient,
          })}
        />
        <Route
          path="project/:projectId"
          element={<Project />}
          loader={projectDetailsLoader({
            queryClient: reactQueryClient,
            apolloClientFactory,
          })}
        />
        <Route path="ecocredits" element={<KeplrRoute component={Dashboard} />}>
          <Route
            path="portfolio"
            element={<KeplrRoute component={MyEcocredits} />}
          />
          <Route
            path="projects"
            element={<KeplrRoute component={MyProjects} />}
          />
          <Route
            path="credit-classes"
            element={<KeplrRoute component={MyCreditClasses} />}
          />
          <Route
            path="credit-batches"
            element={<KeplrRoute component={MyCreditBatches} />}
          />
          <Route path="bridge" element={<KeplrRoute component={MyBridge} />}>
            <Route index element={<MyBridgableEcocreditsTable />} />
            <Route path="bridgable" element={<MyBridgableEcocreditsTable />} />
            <Route path="bridged" element={<MyBridgedEcocreditsTable />} />
          </Route>
        </Route>
        <Route
          path="ecocredits/accounts/:accountAddress"
          element={<EcocreditsByAccount />}
        >
          <Route path="portfolio" element={<PortfolioTab />} />
          <Route path="bridge" element={<BridgeTab />} />
        </Route>
        <Route
          path="ecocredit-batches/:page"
          element={<EcocreditBatches />}
          loader={ecocreditBatchesLoader({
            queryClient: reactQueryClient,
          })}
        />
        <Route
          path="ecocredits/create-batch"
          element={<KeplrRoute component={CreateBatch} />}
        />
        <Route path="baskets/:basketDenom" element={<BasketDetails />} />
        <Route path="credit-batches/:batchDenom" element={<BatchDetails />} />
        <Route path="project-pages">
          <Route path=":projectId" element={<ProjectCreate />}>
            <Route
              path="choose-credit-class"
              element={<KeplrRoute component={ChooseCreditClassPage} />}
            />
            <Route
              path="basic-info"
              element={<KeplrRoute component={BasicInfo} />}
            />
            <Route
              path="location"
              element={<KeplrRoute component={ProjectLocation} />}
            />
            <Route path="story" element={<KeplrRoute component={Story} />} />
            <Route
              path="description"
              element={<KeplrRoute component={Description} />}
            />
            <Route path="media" element={<KeplrRoute component={Media} />} />
            <Route
              path="metadata"
              element={<KeplrRoute component={ProjectMetadata} />}
            />
            <Route path="roles" element={<KeplrRoute component={Roles} />} />
            <Route
              path="review"
              element={<KeplrRoute component={ProjectReview} />}
            />
            <Route
              path="finished"
              element={<KeplrRoute component={ProjectFinished} />}
            />
            <Route path="edit" element={<KeplrRoute component={ProjectEdit} />}>
              <Route
                path="basic-info"
                element={<KeplrRoute component={BasicInfo} />}
              />
              <Route
                path="location"
                element={<KeplrRoute component={ProjectLocation} />}
              />
              <Route path="story" element={<KeplrRoute component={Story} />} />
              <Route
                path="description"
                element={<KeplrRoute component={Description} />}
              />
              <Route path="media" element={<KeplrRoute component={Media} />} />
              <Route path="roles" element={<KeplrRoute component={Roles} />} />
              <Route
                path="metadata"
                element={<KeplrRoute component={ProjectMetadata} />}
              />
            </Route>
          </Route>
        </Route>
        <Route
          path="methodologies/:methodologyId"
          element={<MethodologyDetails />}
        />
        <Route path="credit-classes">
          {/* TODO: Index route is same as /create-credit-class for now */}
          <Route index element={<CreateCreditClassInfo />} />
          <Route path=":creditClassId/*">
            <Route
              index
              element={<CreditClassDetails isLandSteward={true} />}
            />
            <Route
              path="buyer"
              element={<CreditClassDetails isLandSteward={false} />}
            />
            <Route
              path="land-steward"
              element={<CreditClassDetails isLandSteward={true} />}
            />
          </Route>
          <Route
            path="create"
            element={<KeplrRoute component={CreateCreditClass} />}
          />
        </Route>
        <Route path="stats/activity" element={<Activity />} />
        <Route
          path="storefront"
          element={<Storefront />}
          loader={storefrontLoader({
            queryClient: reactQueryClient,
          })}
        />
        <Route
          path="certificate/:certificateId"
          element={<CertificatePage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="profile">
        <Route path="edit" element={<KeplrRoute component={ProfileEdit} />} />
      </Route>
      <Route path="connect-wallet" element={<ConnectWalletPage />} />
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
    getRoutes({ reactQueryClient, apolloClientFactory }),
    {
      basename: process.env.PUBLIC_URL,
    },
  );
};
