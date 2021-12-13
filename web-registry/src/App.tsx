import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0, OAuthError } from '@auth0/auth0-react';

import { createBrowserHistory } from 'history';
import isAdmin from './lib/admin';
import { init as initGA } from './lib/ga';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';
import { ScrollToTop, ProtectedRoute } from './components/atoms';
import { RegistryNav } from './components/organisms';

import {
  // Additionality,
  // Eligibility,
  // GettingStarted,
  Admin,
  BasicInfo,
  BuyerCreate,
  BuyersPage,
  CertificatePage,
  ChooseCreditClass,
  CreateCreditClass,
  CreateMethodology,
  CreditClassDetails,
  CreditsIssue,
  BuyerCreditsTransfer,
  CreditsRetire,
  CreditsTransfer,
  EntityDisplay,
  Home,
  // Home,
  LandStewards,
  Media,
  MethodologyDetails,
  MethodologyReviewProcess,
  NotFoundPage,
  OrganizationProfile,
  PostPurchase,
  Project,
  ProjectList,
  ProjectLocation,
  Roles,
  Seller,
  Signup,
  Story,
  UserProfile,
  VerifyEmail,
  ProjectEdit,
} from './pages';

import './App.css';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="verify-email" element={<VerifyEmail />} />
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
              element={<ProtectedRoute component={ChooseCreditClass} />}
            />
            <Route
              path="basic-info"
              element={<ProtectedRoute component={BasicInfo} />}
            />
            <Route
              path="location"
              element={<ProtectedRoute component={ProjectLocation} />}
            />
            <Route
              path="story"
              element={<ProtectedRoute component={Story} />}
            />
            <Route
              path="media"
              element={<ProtectedRoute component={Media} />}
            />
            <Route
              path="roles"
              element={<ProtectedRoute component={Roles} />}
            />
            <Route
              path="entity-display"
              element={<ProtectedRoute component={EntityDisplay} />}
            />
            <Route
              path="edit"
              element={<ProtectedRoute component={ProjectEdit} />}
            >
              <Route
                path="basic-info"
                element={<ProtectedRoute component={BasicInfo} />}
              />
              <Route
                path="location"
                element={<ProtectedRoute component={ProjectLocation} />}
              />
              <Route
                path="story"
                element={<ProtectedRoute component={Story} />}
              />
              <Route
                path="media"
                element={<ProtectedRoute component={Media} />}
              />
              <Route
                path="roles"
                element={<ProtectedRoute component={Roles} />}
              />
              <Route
                path="entity-display"
                element={<ProtectedRoute component={EntityDisplay} />}
              />
            </Route>
          </Route>
          <Route path="admin" element={<Admin />} />
          {isAdmin(user) && (
            <>
              <Route path="admin/credits">
                <Route
                  path="create-and-transfer"
                  element={<ProtectedRoute component={BuyerCreditsTransfer} />}
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
          {/* <Route path="methodologies" element={<MethodologiesList />} /> TODO */}
          <Route
            path="methodologies/:methodologyId"
            element={<MethodologyDetails />}
          />
          <Route
            path="credit-classes/:creditClassId/*"
            element={<CreditClassDetails />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <CookiesBanner privacyUrl="https://www.regen.network/privacy-policy/" />
        <footer>{/* <AppFooter /> */}</footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
