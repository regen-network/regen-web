import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth0, OAuthError } from '@auth0/auth0-react';

import { createBrowserHistory } from 'history';
import isAdmin from './lib/admin';
import { init as initGA } from './lib/ga';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';
import { ScrollToTop, ProtectedRoute } from './components/atoms';
import { RegistryNav, AppFooter } from './components/organisms';

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
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/verify-email">
            <VerifyEmail />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/certificate">
            <CertificatePage />
          </Route>
          <Route exact path={`/projects/wilmot/admin`} component={Seller} />
          <Route exact path="/projects/impactag">
            <Redirect to="/projects/wilmot" />
          </Route>
          <Route exact path="/projects/impactag/admin">
            <Redirect to="/projects/wilmot/admin" />
          </Route>
          <Route exact path="/buyers" component={BuyersPage} />
          <Route exact path="/create-methodology" component={CreateMethodology} />
          <Route exact path="/create-credit-class" component={CreateCreditClass} />
          <Route exact path="/land-stewards" component={LandStewards} />
          <Route exact path="/methodology-review-process" component={MethodologyReviewProcess} />
          <Route
            path="/projects"
            render={({ match: { path } }) => (
              <>
                <Route path={path} exact>
                  <Redirect to="/projects/wilmot" />
                </Route>
                <Route path={`${path}/:projectId`} component={Project} />
              </>
            )}
          />
          <Route
            path="/post-purchase"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/:projectId/:walletId/:name`} component={PostPurchase} />
              </>
            )}
          />
          <ProtectedRoute path="/user-profile" component={UserProfile} />
          <ProtectedRoute path="/organization-profile" component={OrganizationProfile} />
          <Route
            path="/project-pages"
            render={({ match: { path } }) => (
              <>
                <ProtectedRoute path={path} exact component={ProjectList} />
                <ProtectedRoute exact path={`${path}/edit/:projectId`} component={ProjectEdit} />
                <ProtectedRoute path={`${path}/edit/:projectId/:section`} component={ProjectEdit} />
                <ProtectedRoute
                  path={`${path}/:projectId/choose-credit-class`}
                  component={ChooseCreditClass}
                />
                <ProtectedRoute path={`${path}/:projectId/basic-info`} component={BasicInfo} />
                <ProtectedRoute path={`${path}/:projectId/location`} component={ProjectLocation} />
                <ProtectedRoute path={`${path}/:projectId/story`} component={Story} />
                <ProtectedRoute path={`${path}/:projectId/media`} component={Media} />
                <ProtectedRoute path={`${path}/:projectId/roles`} component={Roles} />
                <ProtectedRoute path={`${path}/:projectId/entity-display`} component={EntityDisplay} />

                {/* Used for Project Plan flow
                <ProtectedRoute path={`${path}/:projectId/getting-started`} component={GettingStarted} />
                <Route
                  path={`${path}/eligibility`}
                  render={({ match: { path } }) => (
                    <>
                      <ProtectedRoute path={path} exact component={Eligibility} />
                      <ProtectedRoute path={`${path}/additionality`} component={Additionality} />
                    </>
                  )}
                /> */}
              </>
            )}
          />
          <Route
            path="/admin"
            render={({ match: { path } }) => (
              <>
                <ProtectedRoute path={path} component={Admin} exact />
                {isAdmin(user) && (
                  <>
                    <ProtectedRoute
                      path={`${path}/credits/create-and-transfer`}
                      component={BuyerCreditsTransfer}
                    />
                    <ProtectedRoute path={`${path}/credits/issue`} component={CreditsIssue} />
                    <ProtectedRoute path={`${path}/credits/transfer`} component={CreditsTransfer} />
                    <ProtectedRoute path={`${path}/credits/retire`} component={CreditsRetire} />
                    <ProtectedRoute path={`${path}/buyer/create`} component={BuyerCreate} />
                  </>
                )}
              </>
            )}
          />
          <Route
            path="/methodologies"
            render={({ match: { path } }) => (
              <>
                {/* <Route path={path} exact component={MethodologiesList} /> TODO */}
                <Route path={`${path}/:methodologyId`} component={MethodologyDetails} />
              </>
            )}
          />
          <Route
            path="/credit-classes"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/:creditClassId`} component={CreditClassDetails} />
              </>
            )}
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <CookiesBanner privacyUrl="https://www.regen.network/privacy-policy/" />
        <footer>
          <AppFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
