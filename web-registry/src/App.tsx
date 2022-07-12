import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0, OAuthError } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';

import isAdmin from './lib/admin';
import { init as initGA } from './lib/ga';
import { ScrollToTop, ProtectedRoute, KeplrRoute } from './components/atoms';
import { RegistryNav, AppFooter } from './components/organisms';
import { ProjectMetadata } from './pages/ProjectMetadata/ProjectMetadata';

import './App.css';
import PageLoader from './components/atoms/PageLoader';

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
const ProjectList = lazy(() => import('./pages/ProjectList'));
const ProjectLocation = lazy(() => import('./pages/ProjectLocation'));
const Roles = lazy(() => import('./pages/Roles'));
const Seller = lazy(() => import('./pages/Seller'));
const Signup = lazy(() => import('./pages/Signup'));
const Story = lazy(() => import('./pages/Story'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ProjectEdit = lazy(() => import('./pages/ProjectEdit'));
const Activity = lazy(() => import('./pages/Activity'));
const CreateBatch = lazy(() => import('./pages/CreateBatch'));

export const history = createBrowserHistory();

const App: React.FC = (): JSX.Element => {
  const { user, isLoading, error } = useAuth0();

  useEffect(() => {
    initGA();
  });

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
      <ScrollToTop />
      <div>
        <RegistryNav />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="add" element={<Additionality />} />
            <Route path="signup" element={<Signup />} />
            <Route path="certificate" element={<CertificatePage />} />
            <Route path="projects/wilmot/admin" element={<Seller />} />
            <Route path="buyers" element={<BuyersPage />} />
            <Route path="create-methodology" element={<CreateMethodology />} />
            <Route path="create-credit-class" element={<CreateCreditClass />} />
            <Route path="land-stewards" element={<LandStewards />} />
            <Route
              path="methodology-review-process"
              element={<MethodologyReviewProcess />}
            />
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
              path="project-pages"
              element={<ProtectedRoute component={ProjectList} />}
            />
            <Route path="project-pages/:projectId">
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
                path="entity-display"
                element={<KeplrRoute component={EntityDisplay} />}
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
            <Route
              path="credit-classes/:creditClassId/*"
              element={<CreditClassDetails />}
            />
            <Route path="stats/activity" element={<Activity />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <CookiesBanner privacyUrl="https://www.regen.network/privacy-policy/" />
        <footer>
          <AppFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
