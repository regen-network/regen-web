import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth0, OAuthError } from '@auth0/auth0-react';

import { createBrowserHistory } from 'history';
import isAdmin from './lib/admin';
import { init as initGA } from './lib/ga';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';
import { ScrollToTop, ProtectedRoute } from './components/atoms';
import { /* RegistryNav, */ AppFooter, MarketingNav } from './components/organisms';

import {
  Additionality,
  Admin,
  BasicInfo,
  BuyerCreate,
  CertificatePage,
  ChooseCreditClass,
  Credits,
  CreditsIssue,
  CreditsRetire,
  CreditsTransfer,
  Eligibility,
  GettingStarted,
  // Home,
  NotFoundPage,
  PostPurchase,
  Project,
  ProjectPlans,
  Projects,
  Seller,
  Signup,
  Story,
  UserProfile,
  VerifyEmail,
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
        {/* <RegistryNav /> */}
        <MarketingNav />
        <Switch>
          <Route exact path="/">
            {/* <Home /> */}
            <Redirect to="/projects/wilmot" />
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
          <Route
            path="/projects"
            render={({ match: { path } }) => (
              <>
                <Route path={path} component={Projects} exact>
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
          <Route
            path="/credits"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/:projectId`} component={Credits}>
                  <Redirect to="/projects/wilmot" />
                </Route>
              </>
            )}
          />
          <ProtectedRoute path="/user-profile" component={UserProfile} />
          <Route
            path="/project-pages"
            render={({ match: { path } }) => (
              <>
                <ProtectedRoute path={path} exact component={ProjectPlans} />
                <ProtectedRoute path={`${path}/getting-started`} component={GettingStarted} />
                <ProtectedRoute path={`${path}/choose-credit-class`} component={ChooseCreditClass} />
                <ProtectedRoute path={`${path}/basic-info`} component={BasicInfo} />
                <Route
                  path={`${path}/eligibility`}
                  render={({ match: { path } }) => (
                    <>
                      <ProtectedRoute path={path} exact component={Eligibility} />
                      <ProtectedRoute path={`${path}/additionality`} component={Additionality} />
                    </>
                  )}
                />
                <ProtectedRoute path={`${path}/story`} component={Story} />
              </>
            )}
          />
          <Route
            path="/admin"
            render={({ match: { path } }) => (
              <>
                <Route path={path} component={Admin} exact />
                {isAdmin(user) && (
                  <>
                    <Route path={`${path}/credits/issue`} component={CreditsIssue} />
                    <Route path={`${path}/credits/transfer`} component={CreditsTransfer} />
                    <Route path={`${path}/credits/retire`} component={CreditsRetire} />
                    <Route path={`${path}/buyer/create`} component={BuyerCreate} />
                  </>
                )}
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
