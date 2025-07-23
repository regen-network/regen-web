import { lazy, useMemo } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Router } from '@remix-run/router';
import * as Sentry from '@sentry/react';
import { QueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { batchDetailsLoader } from 'legacy-pages/BatchDetails/BatchDetails.loader';
import { buyCreditsLoader } from 'legacy-pages/BuyCredits/BuyCredits.loader';
import { CertificatePage } from 'legacy-pages/Certificate/Certificate';
import { EditProfile } from 'legacy-pages/Dashboard/Dashboard.EditProfile';
import { DashboardSettings } from 'legacy-pages/Dashboard/Dashboard.Settings';
import MyBridge from 'legacy-pages/Dashboard/MyBridge';
import { MyBridgableEcocreditsTable } from 'legacy-pages/Dashboard/MyBridge/MyBridge.BridgableEcocreditsTable';
import { MyBridgedEcocreditsTable } from 'legacy-pages/Dashboard/MyBridge/MyBridge.BridgedEcocreditsTable';
import MyCreditBatches from 'legacy-pages/Dashboard/MyCreditBatches';
import MyCreditClasses from 'legacy-pages/Dashboard/MyCreditClasses';
import MyEcocredits from 'legacy-pages/Dashboard/MyEcocredits';
import MyProjects from 'legacy-pages/Dashboard/MyProjects';
import { ecocreditBatchesLoader } from 'legacy-pages/EcocreditBatches/EcocreditBatches.loader';
import Faucet from 'legacy-pages/Faucet';
import { homeLoader } from 'legacy-pages/Home/Home.loader';
import { storefrontLoader } from 'legacy-pages/Marketplace/Storefront/Storefront.loader';
import { CreditBatchesTab } from 'legacy-pages/Profile/CreditBatchesTab/CreditBatchesTab';
import { CreditClassTab } from 'legacy-pages/Profile/CreditClassTab/CreditClassTab';
import { PortfolioTab } from 'legacy-pages/Profile/PortfolioTab/Profile.PortfolioTab';
import ProjectsTab from 'legacy-pages/Profile/ProjectsTab';
import { projectsLoader } from 'legacy-pages/Projects/AllProjects/AllProjects.loader';
import Settings from 'legacy-pages/Settings';
import { safeLazy } from 'utils/safeLazy';

import { Maybe } from 'generated/graphql';
import { QueryClient as RPCQueryClient, useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
// import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { useWallet } from 'lib/wallet/wallet';

import { AuthRoute } from 'components/atoms/AuthRoute';
import { KeplrOrAuthRoute } from 'components/atoms/KeplrOrAuthRoute';
import PageLoader from 'components/atoms/PageLoader';
import { RegistryLayout } from 'components/organisms/RegistryLayout/RegistryLayout';
import { registryLayoutLoader } from 'components/organisms/RegistryLayout/RegistryLayout.loader';

import { KeplrRoute } from '../../components/atoms';
import { ProjectMetadata } from '../../legacy-pages/ProjectMetadata/ProjectMetadata';

const Additionality = safeLazy(
  () => import('../../legacy-pages/Additionality'),
);
const AllProjects = safeLazy(
  () => import('../../legacy-pages/Projects/AllProjects'),
);
const BasicInfo = safeLazy(() => import('../../legacy-pages/BasicInfo'));
const BatchDetails = safeLazy(() => import('../../legacy-pages/BatchDetails'));
const BasketDetails = safeLazy(
  () => import('../../legacy-pages/BasketDetails'),
);
const BuyCredits = safeLazy(() => import('../../legacy-pages/BuyCredits'));
const Sell = safeLazy(() => import('../../legacy-pages/Sell/Sell'));

const ChooseCreditClassPage = safeLazy(
  () => import('../../legacy-pages/ChooseCreditClass'),
);
const CreateCreditClassInfo = safeLazy(
  () => import('../../legacy-pages/CreateCreditClassInfo'),
);
const CreateCreditClass = safeLazy(
  () => import('../../legacy-pages/CreateCreditClass'),
);
const CreditClassDetails = safeLazy(
  () => import('../../legacy-pages/CreditClassDetails'),
);
const Dashboard = safeLazy(() => import('../../legacy-pages/Dashboard'));
const Description = safeLazy(() => import('../../legacy-pages/Description'));
const EcocreditBatches = safeLazy(
  () => import('../../legacy-pages/EcocreditBatches'),
);
const Profile = safeLazy(() => import('../../legacy-pages/Profile'));

// ErrorPage cannot use safeLazy because it could create a circular dependency
// since safeLazy itself uses ErrorPage as its fallback component when imports fail.
const ErrorPage = lazy(() => import('../../legacy-pages/ErrorPage'));
const Home = safeLazy(() => import('../../legacy-pages/Home'));
const LandStewards = safeLazy(() => import('../../legacy-pages/LandStewards'));
const LoginPage = safeLazy(() => import('../../legacy-pages/Login'));
const Media = safeLazy(() => import('../../legacy-pages/Media'));
const MethodologyDetails = safeLazy(
  () => import('../../legacy-pages/MethodologyDetails'),
);
const NotFoundPage = safeLazy(() => import('../../legacy-pages/NotFound'));
const Post = safeLazy(() => import('../../legacy-pages/Post'));
const PrefinanceProjects = safeLazy(
  () => import('../../legacy-pages/Projects/PrefinanceProjects'),
);
const Projects = safeLazy(() => import('../../legacy-pages/Projects'));
const ProjectCreate = safeLazy(
  () => import('../../legacy-pages/ProjectCreate'),
);
const ProjectFinished = safeLazy(
  () => import('../../legacy-pages/ProjectFinished'),
);
const ProjectLocation = safeLazy(
  () => import('../../legacy-pages/ProjectLocation'),
);
const ProjectReview = safeLazy(
  () => import('../../legacy-pages/ProjectReview'),
);
const Roles = safeLazy(() => import('../../legacy-pages/Roles'));
const VerifyEmail = safeLazy(() => import('../../legacy-pages/VerifyEmail'));
const ProjectEdit = safeLazy(() => import('../../legacy-pages/ProjectEdit'));
const Activity = safeLazy(() => import('../../legacy-pages/Activity'));
const CreateBatch = safeLazy(() => import('../../legacy-pages/CreateBatch'));
const Storefront = safeLazy(
  () => import('../../legacy-pages/Marketplace/Storefront'),
);
const ConnectWalletPage = safeLazy(
  () => import('../../legacy-pages/ConnectWalletPage'),
);
const Orders = safeLazy(() => import('../../legacy-pages/Orders'));

type RouterProps = {
  reactQueryClient: QueryClient;
};

export default function RegenRoutes({ reactQueryClient }: RouterProps) {
  const { activeWalletAddr } = useWallet();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { queryClient: rpcQueryClient } = useLedger();
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const router = useMemo(
    () =>
      getRegenRouter({
        reactQueryClient,
        apolloClient,
        rpcQueryClient,
        address: activeWalletAddr,
        languageCode: selectedLanguage,
      }),
    [
      activeWalletAddr,
      apolloClient,
      selectedLanguage,
      reactQueryClient,
      rpcQueryClient,
    ],
  );

  return <RouterProvider router={router} fallbackElement={<PageLoader />} />;
}

export type RouterParams = {
  reactQueryClient: QueryClient;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  rpcQueryClient: RPCQueryClient | undefined;
  address?: Maybe<string>;
  languageCode: string;
};

export const getRegenRoutes = ({
  reactQueryClient,
  apolloClient,
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
          apolloClient,
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
          <Route
            path="project/:projectId/buy"
            element={<BuyCredits />}
            loader={buyCreditsLoader({
              queryClient: reactQueryClient,
              apolloClient,
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
            //   apolloClient,
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
  apolloClient,
  rpcQueryClient,
  address,
  languageCode,
}: RouterParams): Router => {
  const sentryCreateBrowserRouter =
    Sentry.wrapCreateBrowserRouter(createBrowserRouter);
  return sentryCreateBrowserRouter(
    getRegenRoutes({
      reactQueryClient,
      apolloClient,
      rpcQueryClient,
      address,
      languageCode,
    }),
    {
      basename: '',
    },
  );
};
