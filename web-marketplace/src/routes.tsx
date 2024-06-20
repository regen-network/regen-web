import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { Router } from '@remix-run/router';
import * as Sentry from '@sentry/react';
import { QueryClient } from '@tanstack/react-query';

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { useWallet } from 'lib/wallet/wallet';

import { CertificatePage } from 'pages/Certificate/Certificate';
import MyBridge from 'pages/Dashboard/MyBridge';
import { MyBridgableEcocreditsTable } from 'pages/Dashboard/MyBridge/MyBridge.BridgableEcocreditsTable';
import { MyBridgedEcocreditsTable } from 'pages/Dashboard/MyBridge/MyBridge.BridgedEcocreditsTable';
import MyCreditBatches from 'pages/Dashboard/MyCreditBatches';
import MyCreditClasses from 'pages/Dashboard/MyCreditClasses';
import MyEcocredits from 'pages/Dashboard/MyEcocredits';
import MyProjects from 'pages/Dashboard/MyProjects';
import { ecocreditBatchesLoader } from 'pages/EcocreditBatches/EcocreditBatches.loader';
import { CreditBatchesTab } from 'pages/EcocreditsByAccount/CreditBatchesTab/CreditBatchesTab';
import { CreditClassTab } from 'pages/EcocreditsByAccount/CreditClassTab/CreditClassTab';
import { PortfolioTab } from 'pages/EcocreditsByAccount/PortfolioTab/EcocreditsByAccount.PortfolioTab';
import ProjectsTab from 'pages/EcocreditsByAccount/ProjectsTab';
import Faucet from 'pages/Faucet';
import { homeLoader } from 'pages/Home/Home.loader';
import { storefrontLoader } from 'pages/Marketplace/Storefront/Storefront.loader';
import { ProfileEditMain } from 'pages/ProfileEdit/ProfileEdit.Main';
import { ProfileEditSettings } from 'pages/ProfileEdit/ProfileEdit.Settings';
import { projectsLoader } from 'pages/Projects/AllProjects/AllProjects.loader';
import Settings from 'pages/Settings';
import { AuthRoute } from 'components/atoms/AuthRoute';
import { KeplrOrAuthRoute } from 'components/atoms/KeplrOrAuthRoute';
import PageLoader from 'components/atoms/PageLoader';
import { RegistryLayout } from 'components/organisms/RegistryLayout/RegistryLayout';
import { projectDetailsLoader } from 'components/templates/ProjectDetails/ProjectDetails.loader';

import { KeplrRoute } from './components/atoms';
import { ProjectMetadata } from './pages/ProjectMetadata/ProjectMetadata';

const Additionality = lazy(() => import('./pages/Additionality'));
const AllProjects = lazy(() => import('./pages/Projects/AllProjects'));
const BasicInfo = lazy(() => import('./pages/BasicInfo'));
const BatchDetails = lazy(() => import('./pages/BatchDetails'));
const BasketDetails = lazy(() => import('./pages/BasketDetails'));
const ChooseCreditClassPage = lazy(() => import('./pages/ChooseCreditClass'));
const CreateCreditClassInfo = lazy(
  () => import('./pages/CreateCreditClassInfo'),
);
const CreateCreditClass = lazy(() => import('./pages/CreateCreditClass'));
const CreditClassDetails = lazy(() => import('./pages/CreditClassDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Description = lazy(() => import('./pages/Description'));
const EcocreditBatches = lazy(() => import('./pages/EcocreditBatches'));
const EcocreditsByAccount = lazy(() => import('./pages/EcocreditsByAccount'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const Home = lazy(() => import('./pages/Home'));
const LandStewards = lazy(() => import('./pages/LandStewards'));
const LoginPage = lazy(() => import('./pages/Login'));
const Media = lazy(() => import('./pages/Media'));
const MethodologyDetails = lazy(() => import('./pages/MethodologyDetails'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const Post = lazy(() => import('./pages/Post'));
const PrefinanceProjects = lazy(
  () => import('./pages/Projects/PrefinanceProjects'),
);
const Project = lazy(() => import('./pages/Project'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectCreate = lazy(() => import('./pages/ProjectCreate'));
const ProjectFinished = lazy(() => import('./pages/ProjectFinished'));
const ProjectLocation = lazy(() => import('./pages/ProjectLocation'));
const ProjectReview = lazy(() => import('./pages/ProjectReview'));
const Roles = lazy(() => import('./pages/Roles'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ProjectEdit = lazy(() => import('./pages/ProjectEdit'));
const Activity = lazy(() => import('./pages/Activity'));
const CreateBatch = lazy(() => import('./pages/CreateBatch'));
const Storefront = lazy(() => import('./pages/Marketplace/Storefront'));
const ConnectWalletPage = lazy(() => import('./pages/ConnectWalletPage'));
const ProfileEdit = lazy(() => import('./pages/ProfileEdit'));

type RouterProps = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
};

export const Routes = ({
  reactQueryClient,
  apolloClientFactory,
}: RouterProps) => {
  const { wallet } = useWallet();
  return (
    <RouterProvider
      router={getRouter({
        reactQueryClient,
        apolloClientFactory,
        address: wallet?.address,
      })}
      fallbackElement={<PageLoader />}
    />
  );
};

type RouterParams = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
  address?: string;
};

export const getRoutes = ({
  reactQueryClient,
  apolloClientFactory,
  address,
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
        <Route
          path="create-methodology"
          element={<Navigate to="/" replace />}
        />
        <Route
          // TODO: thould this route be moved to /credit-classes?
          path="create-credit-class"
          element={<CreateCreditClassInfo />}
        />
        <Route path="project-developers" element={<LandStewards />} />
        <Route
          path="methodology-review-process"
          element={<Navigate to="/" replace />}
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
          <Route path="prefinance" element={<PrefinanceProjects />} />
        </Route>
        <Route
          path="project/:projectId"
          element={<Project />}
          loader={projectDetailsLoader({
            queryClient: reactQueryClient,
            apolloClientFactory,
          })}
        />
        <Route
          path="post/:iri"
          element={<Post />}
          // TODO
          // loader={postLoader({
          //   queryClient: reactQueryClient,
          //   apolloClientFactory,
          // })}
        />
        <Route
          path="profile"
          element={<KeplrOrAuthRoute component={Dashboard} />}
        >
          <Route
            index
            element={<Navigate to={address ? 'portfolio' : 'projects'} />}
          />
          <Route
            path="portfolio"
            element={<KeplrRoute component={MyEcocredits} />}
          />
          <Route
            path="projects"
            element={<KeplrOrAuthRoute component={MyProjects} />}
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
          path="profiles/:accountAddressOrId"
          element={<EcocreditsByAccount />}
        >
          <Route index element={<Navigate to="portfolio" />} />
          <Route path="portfolio" element={<PortfolioTab />} />
          <Route path="projects" element={<ProjectsTab />} />
          <Route path="credit-classes" element={<CreditClassTab />} />
          <Route path="credit-batches" element={<CreditBatchesTab />} />
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
              element={<AuthRoute component={BasicInfo} />}
            />
            <Route
              path="location"
              element={<AuthRoute component={ProjectLocation} />}
            />
            <Route
              path="description"
              element={<AuthRoute component={Description} />}
            />
            <Route path="media" element={<AuthRoute component={Media} />} />
            <Route
              path="metadata"
              element={<KeplrRoute component={ProjectMetadata} />}
            />
            {/* <Route path="roles" element={<AuthRoute component={Roles} />} /> */}
            <Route
              path="review"
              element={<AuthRoute component={ProjectReview} />}
            />
            <Route
              path="finished"
              element={<AuthRoute component={ProjectFinished} />}
            />
            <Route path="edit" element={<AuthRoute component={ProjectEdit} />}>
              <Route
                path="basic-info"
                element={<AuthRoute component={BasicInfo} />}
              />
              <Route
                path="location"
                element={<AuthRoute component={ProjectLocation} />}
              />
              <Route
                path="description"
                element={<AuthRoute component={Description} />}
              />
              <Route path="media" element={<AuthRoute component={Media} />} />
              {/* <Route path="roles" element={<AuthRoute component={Roles} />} /> */}
              <Route
                path="metadata"
                element={<KeplrRoute component={ProjectMetadata} />}
              />
              <Route
                path="settings"
                element={<AuthRoute component={Settings} />}
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
        <Route path="edit" element={<AuthRoute component={ProfileEdit} />}>
          <Route
            path="profile"
            element={<AuthRoute component={ProfileEditMain} />}
          />
          <Route
            path="settings"
            element={<AuthRoute component={ProfileEditSettings} />}
          />
        </Route>
      </Route>
      <Route path="connect-wallet" element={<ConnectWalletPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="faucet" element={<Faucet />} />
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
      basename: import.meta.env.PUBLIC_URL,
    },
  );
};
