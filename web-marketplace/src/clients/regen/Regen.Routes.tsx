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
import { useAtom } from 'jotai';
import { safeLazy } from 'utils/safeLazy';
import { CreditBatchesTab } from 'web-marketplace/src/pages/Profile/CreditBatchesTab/CreditBatchesTab';
import { CreditClassTab } from 'web-marketplace/src/pages/Profile/CreditClassTab/CreditClassTab';
import { PortfolioTab } from 'web-marketplace/src/pages/Profile/PortfolioTab/Profile.PortfolioTab';
import ProjectsTab from 'web-marketplace/src/pages/Profile/ProjectsTab';

import { Maybe } from 'generated/graphql';
import { QueryClient as RPCQueryClient, useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { useWallet } from 'lib/wallet/wallet';

import { batchDetailsLoader } from 'pages/BatchDetails/BatchDetails.loader';
import { buyCreditsLoader } from 'pages/BuyCredits/BuyCredits.loader';
import { CertificatePage } from 'pages/Certificate/Certificate';
import { EditProfile } from 'pages/Dashboard/Dashboard.EditProfile';
import { DashboardSettings } from 'pages/Dashboard/Dashboard.Settings';
import MyBridge from 'pages/Dashboard/MyBridge';
import { MyBridgableEcocreditsTable } from 'pages/Dashboard/MyBridge/MyBridge.BridgableEcocreditsTable';
import { MyBridgedEcocreditsTable } from 'pages/Dashboard/MyBridge/MyBridge.BridgedEcocreditsTable';
import MyCreditBatches from 'pages/Dashboard/MyCreditBatches';
import MyCreditClasses from 'pages/Dashboard/MyCreditClasses';
import MyEcocredits from 'pages/Dashboard/MyEcocredits';
import MyProjects from 'pages/Dashboard/MyProjects';
import { ecocreditBatchesLoader } from 'pages/EcocreditBatches/EcocreditBatches.loader';
import Faucet from 'pages/Faucet';
import { homeLoader } from 'pages/Home/Home.loader';
import { projectsLoader } from 'pages/Projects/AllProjects/AllProjects.loader';
import Settings from 'pages/Settings';
import { AuthRoute } from 'components/atoms/AuthRoute';
import { KeplrOrAuthRoute } from 'components/atoms/KeplrOrAuthRoute';
import PageLoader from 'components/atoms/PageLoader';
import { RegistryLayout } from 'components/organisms/RegistryLayout/RegistryLayout';
import { registryLayoutLoader } from 'components/organisms/RegistryLayout/RegistryLayout.loader';
import { projectDetailsLoader } from 'components/templates/ProjectDetails/ProjectDetails.loader';

import { KeplrRoute } from '../../components/atoms';
import { ProjectMetadata } from '../../pages/ProjectMetadata/ProjectMetadata';

const Additionality = safeLazy(() => import('../../pages/Additionality'));
const AllProjects = safeLazy(() => import('../../pages/Projects/AllProjects'));
const BasicInfo = safeLazy(() => import('../../pages/BasicInfo'));
const BatchDetails = safeLazy(() => import('../../pages/BatchDetails'));
const BasketDetails = safeLazy(() => import('../../pages/BasketDetails'));
const BuyCredits = safeLazy(() => import('../../pages/BuyCredits'));
const Sell = safeLazy(() => import('../../pages/Sell/Sell'));
const ChooseCreditClassPage = safeLazy(
  () => import('../../pages/ChooseCreditClass'),
);
const CreateCreditClassInfo = safeLazy(
  () => import('../../pages/CreateCreditClassInfo'),
);
const CreateCreditClass = safeLazy(
  () => import('../../pages/CreateCreditClass'),
);
const CreditClassDetails = safeLazy(
  () => import('../../pages/CreditClassDetails'),
);
const Description = safeLazy(() => import('../../pages/Description'));
const EcocreditBatches = safeLazy(() => import('../../pages/EcocreditBatches'));
const Profile = safeLazy(() => import('../../pages/Profile'));

// ErrorPage cannot use safeLazy because it could create a circular dependency
// since safeLazy itself uses ErrorPage as its fallback component when imports fail.
const ErrorPage = lazy(() => import('../../pages/ErrorPage'));
const Home = safeLazy(() => import('../../pages/Home'));
const LandStewards = safeLazy(() => import('../../pages/LandStewards'));
const LoginPage = safeLazy(() => import('../../pages/Login'));
const Media = safeLazy(() => import('../../pages/Media'));
const MethodologyDetails = safeLazy(
  () => import('../../pages/MethodologyDetails'),
);
const NotFoundPage = safeLazy(() => import('../../pages/NotFound'));
const Post = safeLazy(() => import('../../pages/Post'));
const PrefinanceProjects = safeLazy(
  () => import('../../pages/Projects/PrefinanceProjects'),
);
const Project = safeLazy(() => import('../../pages/Project'));
const Projects = safeLazy(() => import('../../pages/Projects'));
const ProjectCreate = safeLazy(() => import('../../pages/ProjectCreate'));
const ProjectFinished = safeLazy(() => import('../../pages/ProjectFinished'));
const ProjectLocation = safeLazy(() => import('../../pages/ProjectLocation'));
const ProjectReview = safeLazy(() => import('../../pages/ProjectReview'));
const Roles = safeLazy(() => import('../../pages/Roles'));
const VerifyEmail = safeLazy(() => import('../../pages/VerifyEmail'));
const ProjectEdit = safeLazy(() => import('../../pages/ProjectEdit'));
const Activity = safeLazy(() => import('../../pages/Activity'));
const CreateBatch = safeLazy(() => import('../../pages/CreateBatch'));
const ConnectWalletPage = safeLazy(
  () => import('../../pages/ConnectWalletPage'),
);
const Dashboard = safeLazy(() => import('../../pages/Dashboard'));
const Orders = safeLazy(() => import('../../pages/Orders'));

type RouterProps = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
};

export const RegenRoutes = ({
  reactQueryClient,
  apolloClientFactory,
}: RouterProps) => {
  const { activeWalletAddr } = useWallet();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { queryClient: rpcQueryClient } = useLedger();

  return (
    <RouterProvider
      router={getRegenRouter({
        reactQueryClient,
        apolloClientFactory,
        rpcQueryClient,
        address: activeWalletAddr,
        languageCode: selectedLanguage,
      })}
      fallbackElement={<PageLoader />}
    />
  );
};

export type RouterParams = {
  reactQueryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
  rpcQueryClient: RPCQueryClient | undefined;
  address?: Maybe<string>;
  languageCode: string;
};

export const getRegenRoutes = ({
  reactQueryClient,
  apolloClientFactory,
  rpcQueryClient,
  address,
  languageCode,
}: RouterParams): RouteObject[] => {
  return createRoutesFromElements(
    <>
      {/* Main routes WITH header/footer */}
      <Route
        element={<RegistryLayout />}
        loader={registryLayoutLoader({
          queryClient: reactQueryClient,
          apolloClientFactory,
          languageCode,
        })}
      >
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
          <Route path="project">
            <Route
              path=":projectId"
              element={<Project />}
              loader={projectDetailsLoader({
                queryClient: reactQueryClient,
                apolloClientFactory,
              })}
            ></Route>
          </Route>
          <Route
            path="project/:projectId/buy"
            element={<BuyCredits />}
            loader={buyCreditsLoader({
              queryClient: reactQueryClient,
              apolloClientFactory,
              address,
              languageCode,
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
          <Route path="profiles/:accountAddressOrId" element={<Profile />}>
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
          <Route
            path="credit-batches/:batchDenom"
            element={<BatchDetails />}
            loader={batchDetailsLoader({
              reactQueryClient,
              rpcQueryClient,
              languageCode,
            })}
          />
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
              <Route path="roles" element={<AuthRoute component={Roles} />} />
              <Route
                path="review"
                element={<AuthRoute component={ProjectReview} />}
              />
              <Route
                path="finished"
                element={<AuthRoute component={ProjectFinished} />}
              />
              <Route
                path="edit"
                element={<AuthRoute component={ProjectEdit} />}
              >
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
                <Route path="roles" element={<AuthRoute component={Roles} />} />
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
          <Route path="certificate/:id" element={<CertificatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="dashboard"
          element={<KeplrOrAuthRoute component={Dashboard} />}
          errorElement={<ErrorPage />}
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
            path="portfolio/bridge"
            element={<KeplrRoute component={MyBridge} />}
          >
            <Route index element={<MyBridgableEcocreditsTable />} />
            <Route path="bridgable" element={<MyBridgableEcocreditsTable />} />
            <Route path="bridged" element={<MyBridgedEcocreditsTable />} />
          </Route>
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
          <Route
            path="profile"
            element={<KeplrOrAuthRoute component={EditProfile} />}
          />
          <Route
            path="settings"
            element={<AuthRoute component={DashboardSettings} />}
          />
          <Route
            path="my-orders"
            element={<KeplrOrAuthRoute component={Orders} />}
          />
          <Route path="sell" element={<KeplrOrAuthRoute component={Sell} />} />
        </Route>

        <Route path="connect-wallet" element={<ConnectWalletPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="faucet" element={<Faucet />} />
      </Route>
    </>,
  );
};

export const getRegenRouter = ({
  reactQueryClient,
  apolloClientFactory,
  rpcQueryClient,
  address,
  languageCode,
}: RouterParams): Router => {
  const sentryCreateBrowserRouter =
    Sentry.wrapCreateBrowserRouter(createBrowserRouter);
  return sentryCreateBrowserRouter(
    getRegenRoutes({
      reactQueryClient,
      apolloClientFactory,
      rpcQueryClient,
      address,
      languageCode,
    }),
    {
      basename: import.meta.env.PUBLIC_URL,
    },
  );
};
