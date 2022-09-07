import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { OAuthError, useAuth0 } from '@auth0/auth0-react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { createBrowserHistory } from 'history';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';

import { KeplrRoute, ProtectedRoute, ScrollToTop } from './components/atoms';
import PageLoader from './components/atoms/PageLoader';
import { AppFooter, RegistryNav } from './components/organisms';
import isAdmin from './lib/admin';
import { useGoogleAnalyticsInit } from './lib/ga';
import { ProjectMetadata } from './pages/ProjectMetadata/ProjectMetadata';

import './App.css';

const Additionality = lazy(() => import('./pages/Additionality'));
const Admin = lazy(() => import('./pages/Admin'));
const BasicInfo = lazy(() => import('./pages/BasicInfo'));
const BatchDetails = lazy(() => import('./pages/BatchDetails'));
const BasketDetails = lazy(() => import('./pages/BasketDetails'));
const BuyerCreate = lazy(() => import('./pages/BuyerCreate'));
const BuyerCreditsTransfer = lazy(() => import('./pages/BuyerCreditsTransfer'));
const BuyersPage = lazy(() => import('./pages/Buyers'));
const CertificatePage = lazy(() => import('./pages/Certificate'));
const ChooseCreditClassPage = lazy(
  () => import('./pages/ChooseCreditClassPage'),
);
const CreateCreditClassInfo = lazy(
  () => import('./pages/CreateCreditClassInfo'),
);
const CreateCreditClass = lazy(() => import('./pages/CreateCreditClass'));
const CreateMethodology = lazy(() => import('./pages/CreateMethodology'));
const CreditClassDetails = lazy(() => import('./pages/CreditClassDetails'));
const CreditsIssue = lazy(() => import('./pages/CreditsIssue'));
const CreditsRetire = lazy(() => import('./pages/CreditsRetire'));
const CreditsTransfer = lazy(() => import('./pages/CreditsTransfer'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Description = lazy(() => import('./pages/Description'));
const EntityDisplay = lazy(() => import('./pages/EntityDisplay'));
const EcocreditsByAccount = lazy(() => import('./pages/EcocreditsByAccount'));
const Home = lazy(() => import('./pages/Home'));
const LandStewards = lazy(() => import('./pages/LandStewards'));
const Media = lazy(() => import('./pages/Media'));
const MethodologyDetails = lazy(() => import('./pages/MethodologyDetails'));
const MethodologyReviewProcess = lazy(
  () => import('./pages/MethodologyReviewProcess'),
);
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const OrganizationProfile = lazy(() => import('./pages/OrganizationProfile'));
const PostPurchase = lazy(() => import('./pages/PostPurchase'));
const Project = lazy(() => import('./pages/Project'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectCreate = lazy(() => import('./pages/ProjectCreate'));
const ProjectFinished = lazy(() => import('./pages/ProjectFinished'));
const ProjectList = lazy(() => import('./pages/ProjectList'));
const ProjectLocation = lazy(() => import('./pages/ProjectLocation'));
const ProjectReview = lazy(() => import('./pages/ProjectReview'));
const Roles = lazy(() => import('./pages/Roles'));
const Seller = lazy(() => import('./pages/Seller'));
const Signup = lazy(() => import('./pages/Signup'));
const Story = lazy(() => import('./pages/Story'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ProjectEdit = lazy(() => import('./pages/ProjectEdit'));
const Activity = lazy(() => import('./pages/Activity'));
const CreateBatch = lazy(() => import('./pages/CreateBatch'));
const Storefront = lazy(() => import('./pages/Marketplace/Storefront'));

Sentry.init({
  dsn: 'https://f5279ac3b8724af88ffb4cdfad92a2d4@o1377530.ingest.sentry.io/6688446',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || 'development',
});

export const history = createBrowserHistory();

const GoogleAnalytics: React.FC = (): JSX.Element => {
  useGoogleAnalyticsInit();
  return <></>;
};

const App: React.FC = (): JSX.Element => {
  const { user, isLoading, error } = useAuth0();
  const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

  if (isLoading) {
    return <div></div>;
  }

  const authError = error as OAuthError;
  if (
    authError &&
    authError.error_description &&
    authError.error_description.indexOf('email_not_verified:') > -1
  ) {
    const email: string = authError.error_description.split(':')[1];
    history.push(`/verify-email?email=${email}`);
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GoogleAnalytics />
      <ScrollToTop />
      <div>
        <RegistryNav />
        <Suspense fallback={<PageLoader />}>
          <SentryRoutes>
            <Route path="/" element={<Home />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="add" element={<Additionality />} />
            <Route path="signup" element={<Signup />} />
            <Route path="certificate" element={<CertificatePage />} />
            <Route path="projects/wilmot/admin" element={<Seller />} />
            <Route path="buyers" element={<BuyersPage />} />
            <Route path="create-methodology" element={<CreateMethodology />} />
            <Route
              // TODO: thould this route be moved to /credit-classes?
              path="create-credit-class"
              element={<CreateCreditClassInfo />}
            />
            <Route path="land-stewards" element={<LandStewards />} />
            <Route
              path="methodology-review-process"
              element={<MethodologyReviewProcess />}
            />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<Project />} />
            <Route
              path="post-purchase/:projectId/:walletId/:name"
              element={<PostPurchase />}
            />
            <Route
              path="ecocredits/dashboard"
              element={<KeplrRoute component={Dashboard} />}
            />
            <Route
              path="ecocredits/accounts/:accountAddress"
              element={<EcocreditsByAccount />}
            />
            <Route
              path="ecocredits/create-batch"
              element={<KeplrRoute component={CreateBatch} />}
            />
            <Route path="baskets/:basketDenom" element={<BasketDetails />} />
            <Route
              path="credit-batches/:batchDenom"
              element={<BatchDetails />}
            />
            <Route
              path="user-profile"
              element={<ProtectedRoute component={UserProfile} />}
            />
            <Route
              path="organization-profile"
              element={<ProtectedRoute component={OrganizationProfile} />}
            />
            <Route
              path="project-list"
              element={<ProtectedRoute component={ProjectList} />}
            />
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
                <Route
                  path="story"
                  element={<KeplrRoute component={Story} />}
                />
                <Route
                  path="description"
                  element={<KeplrRoute component={Description} />}
                />
                <Route
                  path="media"
                  element={<KeplrRoute component={Media} />}
                />
                <Route
                  path="metadata"
                  element={<KeplrRoute component={ProjectMetadata} />}
                />
                <Route
                  path="roles"
                  element={<KeplrRoute component={Roles} />}
                />
                <Route
                  path="entity-display"
                  element={<KeplrRoute component={EntityDisplay} />}
                />
                <Route
                  path="review"
                  element={<KeplrRoute component={ProjectReview} />}
                />
                <Route
                  path="finished"
                  element={<KeplrRoute component={ProjectFinished} />}
                />
                <Route
                  path="edit"
                  element={<KeplrRoute component={ProjectEdit} />}
                >
                  <Route
                    path="basic-info"
                    element={<KeplrRoute component={BasicInfo} />}
                  />
                  <Route
                    path="location"
                    element={<KeplrRoute component={ProjectLocation} />}
                  />
                  <Route
                    path="story"
                    element={<KeplrRoute component={Story} />}
                  />
                  <Route
                    path="media"
                    element={<KeplrRoute component={Media} />}
                  />
                  <Route
                    path="roles"
                    element={<KeplrRoute component={Roles} />}
                  />
                  <Route
                    path="entity-display"
                    element={<KeplrRoute component={EntityDisplay} />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="admin" element={<Admin />} />
            {isAdmin(user) && (
              <>
                <Route path="admin/credits">
                  <Route
                    path="create-and-transfer"
                    element={
                      <ProtectedRoute component={BuyerCreditsTransfer} />
                    }
                  />
                  <Route
                    path="issue"
                    element={<ProtectedRoute component={CreditsIssue} />}
                  />
                  <Route
                    path="transfer"
                    element={<ProtectedRoute component={CreditsTransfer} />}
                  />
                  <Route
                    path="retire"
                    element={<ProtectedRoute component={CreditsRetire} />}
                  />
                </Route>
                <Route
                  path="admin/buyer/create"
                  element={<ProtectedRoute component={BuyerCreate} />}
                />
              </>
            )}
            <Route
              path="methodologies/:methodologyId"
              element={<MethodologyDetails />}
            />
            <Route path="credit-classes">
              {/* TODO: Index route is same as /create-credit-class for now */}
              <Route index element={<CreateCreditClassInfo />} />
              <Route path=":creditClassId" element={<CreditClassDetails />} />
              <Route
                path="create"
                element={<KeplrRoute component={CreateCreditClass} />}
              />
            </Route>
            {/* <Route
              path="credit-classes/:creditClassId/*"
              element={<CreditClassDetails />}
            /> */}
            <Route path="stats/activity" element={<Activity />} />
            <Route>
              <Route path="storefront" element={<Storefront />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </SentryRoutes>
        </Suspense>
        <CookiesBanner
          privacyUrl="https://www.regen.network/privacy-policy/"
          TOSUrl="https://www.regen.network/terms-service/"
        />
        <footer>
          <AppFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
