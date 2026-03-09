/* eslint-disable lingui/no-unlocalized-strings */
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
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { batchDetailsLoader } from 'legacy-pages/BatchDetails/BatchDetails.loader';
import { CertificatePage } from 'legacy-pages/Certificate/Certificate';
import { EditProfile } from 'legacy-pages/Dashboard/Dashboard.EditProfile';
import { DashboardSettings } from 'legacy-pages/Dashboard/Dashboard.Settings';
import MyCreditBatches from 'legacy-pages/Dashboard/MyCreditBatches';
import MyCreditClasses from 'legacy-pages/Dashboard/MyCreditClasses';
import MyEcocredits from 'legacy-pages/Dashboard/MyEcocredits';
import MyProjects from 'legacy-pages/Dashboard/MyProjects';
import { DeprecatedBasketDetails } from 'legacy-pages/DeprecatedBasketDetails/DeprecatedBasketDetails';
import { ecocreditBatchesLoader } from 'legacy-pages/EcocreditBatches/EcocreditBatches.loader';
import Faucet from 'legacy-pages/Faucet';
import { homeLoader } from 'legacy-pages/Home/Home.loader';
import { CreditBatchesTab } from 'legacy-pages/Profile/CreditBatchesTab/CreditBatchesTab';
import { CreditClassTab } from 'legacy-pages/Profile/CreditClassTab/CreditClassTab';
import { MembersTab } from 'legacy-pages/Profile/MembersTab/MembersTab';
import { PortfolioTab } from 'legacy-pages/Profile/PortfolioTab/Profile.PortfolioTab';
import ProjectsTab from 'legacy-pages/Profile/ProjectsTab';
import { projectsLoader } from 'legacy-pages/Projects/AllProjects/AllProjects.loader';
import Settings from 'legacy-pages/Settings';
import { safeLazy } from 'utils/safeLazy';

import { Maybe } from 'generated/graphql';
import { QueryClient as RPCQueryClient, useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { BRIDGE_BASKET_DENOM, BRIDGE_CLASS_ID, ORG_ENABLED } from 'lib/env';
import { useWallet } from 'lib/wallet/wallet';

// import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
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
const BasketDetails = safeLazy(
  () => import('../../legacy-pages/BasketDetails'),
);
const BridgeBlockedBatchDetails = safeLazy(
  () => import('../../legacy-pages/BridgeBlockedBatchDetails'),
);
const BuyCredits = safeLazy(() => import('../../legacy-pages/BuyCredits'));
const DeprecatedBatchDetails = safeLazy(
  () => import('../../legacy-pages/DeprecatedBatchDetails'),
);
const DeprecatedCreditClassDetails = safeLazy(
  () => import('../../legacy-pages/DeprecatedCreditClassDetails'),
);
const Sell = safeLazy(() => import('../../legacy-pages/Sell/Sell'));

const ChooseCreditClassPage = safeLazy(
  () => import('../../legacy-pages/ChooseCreditClass'),
);
const ProjectAccountPage = safeLazy(
  () => import('../../legacy-pages/ProjectAccount'),
);
const CreateCreditClass = safeLazy(
  () => import('../../legacy-pages/CreateCreditClass'),
);
const CreditClassDetails = safeLazy(
  () => import('../../legacy-pages/CreditClassDetails'),
);
const Description = safeLazy(() => import('../../legacy-pages/Description'));
const EcocreditBatches = safeLazy(
  () => import('../../legacy-pages/EcocreditBatches'),
);
const Profile = safeLazy(() => import('../../legacy-pages/Profile'));

// ErrorPage cannot use safeLazy because it could create a circular dependency
// since safeLazy itself uses ErrorPage as its fallback component when imports fail.
const ErrorPage = lazy(() => import('../../legacy-pages/ErrorPage'));
const Home = safeLazy(() => import('../../legacy-pages/Home'));
const LoginPage = safeLazy(() => import('../../legacy-pages/Login'));
const Media = safeLazy(() => import('../../legacy-pages/Media'));
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
const ConnectWalletPage = safeLazy(
  () => import('../../legacy-pages/ConnectWalletPage'),
);
const Dashboard = safeLazy(() => import('../../legacy-pages/Dashboard'));
const Members = safeLazy(() => import('../../legacy-pages/Dashboard/Members'));
const Orders = safeLazy(() => import('../../legacy-pages/Orders'));
const CreateOrganization = safeLazy(
  () => import('../../legacy-pages/CreateOrganization'),
);
const ManageProject = safeLazy(
  () => import('../../legacy-pages/Dashboard/MyProjects/ManageProject'),
);
const Collaborators = safeLazy(
  () =>
    import(
      '../../legacy-pages/Dashboard/MyProjects/ManageProject.Collaborators'
    ),
);
const DataPosts = safeLazy(
  () =>
    import('../../legacy-pages/Dashboard/MyProjects/ManageProject.DataPosts'),
);

type RouterProps = {
  reactQueryClient: QueryClient;
};

export default function RegenRoutes({ reactQueryClient: _ }: RouterProps) {
  const reactQueryClient = useQueryClient();
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
        basename:
          typeof window !== 'undefined'
            ? (() => {
                const segment = window.location.pathname.split('/')[1];
                return segment === 'en' || segment === 'es'
                  ? `/${segment}`
                  : '';
              })()
            : '',
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
  basename?: string;
};

export const getRegenRoutes = ({
  reactQueryClient,
  apolloClient,
  rpcQueryClient,
  address,
  languageCode,
}: RouterParams): RouteObject[] => {
  const renderDashboardChildren = (isOrganization = false) => (
    <>
      <Route
        index
        element={
          <Navigate to={address || isOrganization ? 'portfolio' : 'projects'} />
        }
      />
      <Route
        path="portfolio"
        element={<KeplrOrAuthRoute component={MyEcocredits} />}
      />
      <Route
        path="projects"
        element={<KeplrOrAuthRoute component={MyProjects} />}
      />
      <Route
        path="projects/:projectId/manage"
        element={<KeplrOrAuthRoute component={ManageProject} />}
      >
        <Route index element={<Navigate to="data-posts" />} />
        <Route path="collaborators" element={<Collaborators />} />
        <Route path="data-posts" element={<DataPosts />} />
      </Route>
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
      {!isOrganization && (
        <>
          <Route
            path="settings"
            element={<AuthRoute component={DashboardSettings} />}
          />
          <Route
            path="my-orders"
            element={<KeplrOrAuthRoute component={Orders} />}
          />
        </>
      )}
      {isOrganization && (
        <Route
          path="members"
          element={<KeplrOrAuthRoute component={Members} />}
        />
      )}
      <Route
        path="sell-orders"
        element={<KeplrOrAuthRoute component={Sell} />}
      />
    </>
  );

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
          <Route path="project/:projectId/buy" element={<BuyCredits />} />
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
            <Route path="members" element={<MembersTab />} />
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
          <Route
            path={`baskets/${BRIDGE_BASKET_DENOM}`}
            element={<NotFoundPage />}
          />
          <Route
            path="baskets/deprecated/:basketDenom"
            element={<DeprecatedBasketDetails />}
          />
          <Route path="baskets/:basketDenom" element={<BasketDetails />} />
          <Route
            path="credit-batches/deprecated/:batchDenom"
            element={<DeprecatedBatchDetails />}
            loader={batchDetailsLoader({
              reactQueryClient,
              rpcQueryClient,
              languageCode,
            })}
          />
          <Route
            path="credit-batches/:batchDenom"
            element={<BridgeBlockedBatchDetails />}
            loader={batchDetailsLoader({
              reactQueryClient,
              rpcQueryClient,
              languageCode,
            })}
          />
          <Route path="project-pages">
            <Route path=":projectId" element={<ProjectCreate />}>
              <Route
                path="account"
                element={<AuthRoute component={ProjectAccountPage} />}
              />
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
          {ORG_ENABLED && (
            <Route
              path="organizations/create"
              element={<KeplrOrAuthRoute component={CreateOrganization} />}
            />
          )}
          <Route
            path={`credit-classes/${BRIDGE_CLASS_ID}`}
            element={<NotFoundPage />}
          />
          <Route path="credit-classes">
            <Route
              path="deprecated/:creditClassId"
              element={<DeprecatedCreditClassDetails />}
            />
            <Route path=":creditClassId" element={<CreditClassDetails />} />
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
          path="dashboard/organization"
          element={<KeplrOrAuthRoute component={Dashboard} />}
          errorElement={<ErrorPage />}
        >
          {renderDashboardChildren(true)}
        </Route>

        <Route
          path="dashboard"
          element={<KeplrOrAuthRoute component={Dashboard} />}
          errorElement={<ErrorPage />}
        >
          {renderDashboardChildren(false)}
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
  basename = '',
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
      basename,
    },
  );
};
