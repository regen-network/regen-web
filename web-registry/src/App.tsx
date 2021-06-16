import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth0, OAuthError } from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

import { createBrowserHistory } from 'history';
import isAdmin from './lib/admin';
import { init as initGA } from './lib/ga';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';
import { ScrollToTop, ProtectedRoute } from './components/atoms';
import { /* RegistryNav, */ AppFooter, MarketingNav } from './components/organisms';

import {
  // Additionality,
  Admin,
  BasicInfo,
  BuyerCreate,
  CertificatePage,
  ChooseCreditClass,
  Credits,
  CreditsIssue,
  CreditsRetire,
  CreditsTransfer,
  // Eligibility,
  // GettingStarted,
  // Home,
  NotFoundPage,
  PostPurchase,
  Project,
  ProjectList,
  Projects,
  Seller,
  Signup,
  Story,
  UserProfile,
  VerifyEmail,
} from './pages';

import './App.css';

export const history = createBrowserHistory();

const CREATE_GRAPH = gql`
  mutation CreateGraph($input: CreateShaclGraphInput!) {
    createShaclGraph(input: $input) {
      shaclGraph {
        uri
      }
    }
  }
`;
const App: React.FC = (): JSX.Element => {
  const { user, isLoading, error } = useAuth0();
  const [createGraph] = useMutation(CREATE_GRAPH, {
    errorPolicy: 'ignore',
  });

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
                <ProtectedRoute path={path} exact component={ProjectList} />
                <ProtectedRoute
                  path={`${path}/:projectId/choose-credit-class`}
                  component={ChooseCreditClass}
                />
                <ProtectedRoute path={`${path}/:projectId/basic-info`} component={BasicInfo} />
                <ProtectedRoute path={`${path}/:projectId/story`} component={Story} />

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
        <button
          onClick={() => {
            createGraph({
              variables: {
                input: {
                  shaclGraph: {
                    uri: 'http://regen.network/ProjectPageShape',
                    graph: [{"@id":"_:b0","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/creditClass"}],"http://www.w3.org/ns/shacl#class":[{"@id":"http://regen.network/CreditClass"}],"http://www.w3.org/ns/shacl#nodeKind":[{"@id":"http://www.w3.org/ns/shacl#IRI"}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageCreditClassGroup"}]},{"@id":"_:b1","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/name"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Project name"}],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"project name"}],"http://www.w3.org/ns/shacl#description":[{"@value":"This is the name of the farm, ranch, property, or conservation project."}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minLength":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageBasicInfoGroup"}]},{"@id":"_:b10","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/galleryPhotos"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Gallery photos"}],"http://www.w3.org/ns/shacl#description":[{"@value":"People love pictures of people! Upload images of the land stewards, in addition to the land and animals."}],"http://www.w3.org/ns/shacl#node":[{"@id":"http://datashapes.org/dash#ListShape"}],"http://www.w3.org/ns/shacl#property":[{"@id":"_:b54"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageMediaGroup"}]},{"@id":"_:b11","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b19"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b20"}]},{"@id":"_:b12","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b39"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b40"}]},{"@id":"_:b13","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b59"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b60"}]},{"@id":"_:b14","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/landOwner"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Land Owner"}],"http://www.w3.org/ns/shacl#description":[{"@value":"The individual or organization that owns this land."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#xone":[{"@id":"_:b15"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageRolesGroup"}]},{"@id":"_:b15","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b16"}]},{"@id":"_:b16","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/IndividualShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b17"}]},{"@id":"_:b17","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b18"}]},{"@id":"_:b18","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/OrganizationShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b19","http://www.w3.org/ns/shacl#property":[{"@id":"_:b14"}]},{"@id":"_:b2","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/size"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Size in hectares or acres"}],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"size"}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageBasicInfoGroup"}],"http://www.w3.org/ns/shacl#node":[{"@id":"http://regen.network/ProjectSizeShape"}]},{"@id":"_:b20","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b26"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b27"}]},{"@id":"_:b21","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/landSteward"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Land Steward"}],"http://www.w3.org/ns/shacl#description":[{"@value":"The individual or organization that is performing the work on the ground. This can be a farmer, rancher, conservationist, forester, fisherman, etc."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#xone":[{"@id":"_:b22"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageRolesGroup"}]},{"@id":"_:b22","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b23"}]},{"@id":"_:b23","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/IndividualShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b24"}]},{"@id":"_:b24","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b25"}]},{"@id":"_:b25","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/OrganizationShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b26","http://www.w3.org/ns/shacl#property":[{"@id":"_:b21"}]},{"@id":"_:b27","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b33"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b28","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/projectDeveloper"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Project Developer"}],"http://www.w3.org/ns/shacl#description":[{"@value":"The individual or organization that is in charge of managing the project and is the main point of contact with Regen Registry."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#xone":[{"@id":"_:b29"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageRolesGroup"}]},{"@id":"_:b29","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b30"}]},{"@id":"_:b3","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/location"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Location"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Type an address or latitude/longitude coordinates. This is the location that will appear in the project contracts, and on your project page."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageLocationGroup"}],"http://www.w3.org/ns/shacl#node":[{"@id":"https://purl.org/geojson/vocab#Feature"}]},{"@id":"_:b30","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/IndividualShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b31"}]},{"@id":"_:b31","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b32"}]},{"@id":"_:b32","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/OrganizationShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b33","http://www.w3.org/ns/shacl#property":[{"@id":"_:b28"}]},{"@id":"_:b34","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/landOwner"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#xone":[{"@id":"_:b35"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageEntityDisplayGroup"}]},{"@id":"_:b35","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b36"}]},{"@id":"_:b36","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/IndividualDisplayShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b37"}]},{"@id":"_:b37","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b38"}]},{"@id":"_:b38","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/OrganizationDisplayShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b39","http://www.w3.org/ns/shacl#property":[{"@id":"_:b34"}]},{"@id":"_:b4","http://www.w3.org/ns/shacl#name":[{"@value":"Choose the entities to show on the project page:"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Showing more entities increases the salability of the project. You must show at least one entity on the project page. These entities can only be edited in the previous step."}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageEntityDisplayGroup"}]},{"@id":"_:b40","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b46"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b47"}]},{"@id":"_:b41","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/landSteward"}],"http://www.w3.org/ns/shacl#description":[{"@value":"recommended to increase salability"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#xone":[{"@id":"_:b42"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageEntityDisplayGroup"}]},{"@id":"_:b42","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b43"}]},{"@id":"_:b43","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/IndividualDisplayShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b44"}]},{"@id":"_:b44","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b45"}]},{"@id":"_:b45","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/OrganizationDisplayShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b46","http://www.w3.org/ns/shacl#property":[{"@id":"_:b41"}]},{"@id":"_:b47","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b53"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b48","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/projectDeveloper"}],"http://www.w3.org/ns/shacl#description":[{"@value":"recommended to increase salability"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#xone":[{"@id":"_:b49"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageEntityDisplayGroup"}]},{"@id":"_:b49","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b50"}]},{"@id":"_:b5","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/landStory"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Story of the land"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Describe the story of this property."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minLength":[{"@value":1}],"http://www.w3.org/ns/shacl#maxLength":[{"@value":500}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageStoryGroup"}]},{"@id":"_:b50","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/IndividualDisplayShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b51"}]},{"@id":"_:b51","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/ns/shacl#node"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b52"}]},{"@id":"_:b52","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://regen.network/OrganizationDisplayShape"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b53","http://www.w3.org/ns/shacl#property":[{"@id":"_:b48"}]},{"@id":"_:b54","http://www.w3.org/ns/shacl#path":[{"@id":"_:b56"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://schema.org/URL"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":4}]},{"@id":"_:b55","http://www.w3.org/ns/shacl#zeroOrMorePath":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"}]},{"@id":"_:b56","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b55"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b57"}]},{"@id":"_:b57","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#first"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b58","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/videoURL"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://schema.org/URL"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Video url"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Copy and paste a video url from YouTube, Vimeo, or Facebook."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageMediaGroup"}]},{"@id":"_:b59","http://www.w3.org/ns/shacl#property":[{"@id":"_:b58"}]},{"@id":"_:b6","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/landStewardStory"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Story of the land stewards"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Describe the story of this property."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minLength":[{"@value":1}],"http://www.w3.org/ns/shacl#maxLength":[{"@value":500}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageStoryGroup"}]},{"@id":"_:b60","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@id":"_:b62"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b61","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/landStewardPhoto"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://schema.org/URL"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Land steward photo"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Upload a nice portrait of the land stewards and their families. This should be different from the other photos of land stewards you uploaded in the gallery above."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageMediaGroup"}]},{"@id":"_:b62","http://www.w3.org/ns/shacl#property":[{"@id":"_:b61"}]},{"@id":"_:b63","http://www.w3.org/ns/shacl#path":[{"@id":"http://qudt.org/1.1/schema/qudt#numericValue"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#double"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minExclusive":[{"@value":0}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageBasicInfoGroup"}]},{"@id":"_:b64","http://www.w3.org/ns/shacl#path":[{"@id":"http://qudt.org/1.1/schema/qudt#unit"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://qudt.org/1.1/schema/qudt#unit"}],"http://www.w3.org/ns/shacl#in":[{"@id":"_:b65"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageBasicInfoGroup"}]},{"@id":"_:b65","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@value":"http://qudt.org/1.1/vocab/unit#HA","@type":"http://qudt.org/1.1/schema/qudt#unit"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"_:b66"}]},{"@id":"_:b66","http://www.w3.org/1999/02/22-rdf-syntax-ns#first":[{"@value":"http://qudt.org/1.1/vocab/unit#AC","@type":"http://qudt.org/1.1/schema/qudt#unit"}],"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest":[{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"}]},{"@id":"_:b67","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/legalName"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Organization legal name"}],"http://www.w3.org/ns/shacl#description":[{"@value":"This is the name of the farm, ranch, cooperative, non-profit, or other organization."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}]},{"@id":"_:b68","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/location"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Organization location"}],"http://www.w3.org/ns/shacl#description":[{"@value":"This address is used for issuing credits. If you choose to show this entity on the project page, only city, state/province, and country will be displayed."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#node":[{"@id":"https://purl.org/geojson/vocab#Feature"}]},{"@id":"_:b69","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/responsiblePerson"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Responsible person at organization"}],"http://www.w3.org/ns/shacl#description":[{"@value":"This is the person who will be signing the project plan, and whose name will appear on credit issuance certificates if credits are issued to this organization."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}]},{"@id":"_:b7","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/landStewardStoryTitle"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Land steward story title"}],"http://www.w3.org/ns/shacl#description":[{"@value":"In one sentence, summarize the story above of the land stewards."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minLength":[{"@value":1}],"http://www.w3.org/ns/shacl#maxLength":[{"@value":80}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageStoryGroup"}]},{"@id":"_:b70","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/name"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Full name"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}]},{"@id":"_:b71","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/name"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Organization display name"}],"http://www.w3.org/ns/shacl#description":[{"@value":"This is the display name on your project page, if you choose to make this entity publically viewable."}]},{"@id":"_:b72","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/logo"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://schema.org/URL"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Organization logo"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}]},{"@id":"_:b73","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/description"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Short organization description"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxLength":[{"@value":160}]},{"@id":"_:b74","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/image"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://schema.org/URL"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Bio photo"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}]},{"@id":"_:b75","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/description"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Short person description"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Describe any relevant background and experience."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxLength":[{"@value":160}]},{"@id":"_:b76","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/quote"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Quote from land steward or other important stakeholder"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Choose an inspiring quote that helps others understand why this project is important."}],"http://www.w3.org/ns/shacl#maxLength":[{"@value":160}],"http://www.w3.org/ns/shacl#minLength":[{"@value":1}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageStoryGroup"}]},{"@id":"_:b77","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/name"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Name of person quoted"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minLength":[{"@value":1}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageStoryGroup"}]},{"@id":"_:b78","http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/jobTitle"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Title of person quoted"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#minLength":[{"@value":1}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageStoryGroup"}]},{"@id":"_:b8","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/projectQuote"}],"http://www.w3.org/ns/shacl#node":[{"@id":"http://regen.network/ProjectQuoteShape"}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageStoryGroup"}]},{"@id":"_:b9","http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/previewPhoto"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://schema.org/URL"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Preview photo"}],"http://www.w3.org/ns/shacl#description":[{"@value":"Choose the summary photo that will show up in project previews."}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}],"http://www.w3.org/ns/shacl#group":[{"@id":"http://regen.network/ProjectPageMediaGroup"}]},{"@id":"http://datashapes.org/dash#ListShape"},{"@id":"http://qudt.org/1.1/schema/qudt#numericValue"},{"@id":"http://qudt.org/1.1/schema/qudt#unit"},{"@id":"http://regen.network/CreditClass"},{"@id":"http://regen.network/EmailShape","@type":["http://www.w3.org/ns/shacl#PropertyShape"],"http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/email"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Email address"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#minCount":[{"@value":1}],"http://www.w3.org/ns/shacl#maxCount":[{"@value":1}]},{"@id":"http://regen.network/EntityDisplayShape-showOnProjectPage","@type":["http://www.w3.org/ns/shacl#PropertyShape"],"http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/showOnProjectPage"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#boolean"}],"http://www.w3.org/ns/shacl#hasValue":[{"@value":true}]},{"@id":"http://regen.network/Individual"},{"@id":"http://regen.network/IndividualDisplayShape","@type":["http://www.w3.org/ns/shacl#NodeShape"],"http://www.w3.org/ns/shacl#targetClass":[{"@id":"http://regen.network/Individual"}],"http://www.w3.org/ns/shacl#property":[{"@id":"http://regen.network/EntityDisplayShape-showOnProjectPage"},{"@id":"_:b74"},{"@id":"_:b75"}]},{"@id":"http://regen.network/IndividualShape","@type":["http://www.w3.org/ns/shacl#NodeShape"],"http://www.w3.org/ns/shacl#targetClass":[{"@id":"http://regen.network/Individual"}],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Add Individual"}],"http://www.w3.org/ns/shacl#property":[{"@id":"_:b70"},{"@id":"http://regen.network/EmailShape"},{"@id":"http://regen.network/PhoneNumberShape"},{"@id":"http://regen.network/SharePermissionShape"}]},{"@id":"http://regen.network/Organization"},{"@id":"http://regen.network/OrganizationDisplayShape","@type":["http://www.w3.org/ns/shacl#NodeShape"],"http://www.w3.org/ns/shacl#targetClass":[{"@id":"http://regen.network/Organization"}],"http://www.w3.org/ns/shacl#property":[{"@id":"http://regen.network/EntityDisplayShape-showOnProjectPage"},{"@id":"_:b71"},{"@id":"_:b72"},{"@id":"_:b73"}]},{"@id":"http://regen.network/OrganizationShape","@type":["http://www.w3.org/ns/shacl#NodeShape"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Add Organization"}],"http://www.w3.org/ns/shacl#property":[{"@id":"_:b67"},{"@id":"_:b68"},{"@id":"_:b69"},{"@id":"http://regen.network/EmailShape"},{"@id":"http://regen.network/PhoneNumberShape"},{"@id":"http://regen.network/SharePermissionShape"}]},{"@id":"http://regen.network/PhoneNumberShape","@type":["http://www.w3.org/ns/shacl#PropertyShape"],"http://www.w3.org/ns/shacl#path":[{"@id":"http://schema.org/telephone"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#string"}],"http://www.w3.org/ns/shacl#name":[{"@value":"Phone number"}]},{"@id":"http://regen.network/ProjectPage"},{"@id":"http://regen.network/ProjectPageBasicInfoGroup","@type":["http://www.w3.org/ns/shacl#PropertyGroup"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Basic Info"}],"http://www.w3.org/ns/shacl#order":[{"@value":"1","@type":"http://www.w3.org/2001/XMLSchema#decimal"}]},{"@id":"http://regen.network/ProjectPageCreditClassGroup","@type":["http://www.w3.org/ns/shacl#PropertyGroup"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Choose a Credit Class"}],"http://www.w3.org/ns/shacl#order":[{"@value":"0","@type":"http://www.w3.org/2001/XMLSchema#decimal"}]},{"@id":"http://regen.network/ProjectPageEntityDisplayGroup","@type":["http://www.w3.org/ns/shacl#PropertyGroup"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Entity Display"}],"http://www.w3.org/2000/01/rdf-schema#comment":[{"@value":"See an example <a href=\"\">project page»</a>"}],"http://www.w3.org/ns/shacl#order":[{"@value":"4","@type":"http://www.w3.org/2001/XMLSchema#decimal"}]},{"@id":"http://regen.network/ProjectPageLocationGroup","@type":["http://www.w3.org/ns/shacl#PropertyGroup"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Location"}],"http://www.w3.org/ns/shacl#order":[{"@value":"2","@type":"http://www.w3.org/2001/XMLSchema#decimal"}]},{"@id":"http://regen.network/ProjectPageMediaGroup","@type":["http://www.w3.org/ns/shacl#PropertyGroup"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Media"}],"http://www.w3.org/2000/01/rdf-schema#comment":[{"@value":"See an example <a href=\"\">project page»</a>"}],"http://www.w3.org/ns/shacl#order":[{"@value":"6","@type":"http://www.w3.org/2001/XMLSchema#decimal"}]},{"@id":"http://regen.network/ProjectPageRolesGroup","@type":["http://www.w3.org/ns/shacl#PropertyGroup"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Roles"}],"http://www.w3.org/ns/shacl#order":[{"@value":"3","@type":"http://www.w3.org/2001/XMLSchema#decimal"}]},{"@id":"http://regen.network/ProjectPageShape","@type":["http://www.w3.org/2000/01/rdf-schema#Class","http://www.w3.org/ns/shacl#NodeShape"],"http://www.w3.org/ns/shacl#targetClass":[{"@id":"http://regen.network/ProjectPage"}],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Project Page"}],"http://www.w3.org/2000/01/rdf-schema#subClassOf":[{"@id":"http://www.w3.org/2000/01/rdf-schema#Resource"}],"http://www.w3.org/ns/shacl#property":[{"@id":"_:b0"},{"@id":"_:b1"},{"@id":"_:b2"},{"@id":"_:b3"},{"@id":"_:b4"},{"@id":"_:b5"},{"@id":"_:b6"},{"@id":"_:b7"},{"@id":"_:b8"},{"@id":"_:b9"},{"@id":"_:b10"}],"http://www.w3.org/ns/shacl#or":[{"@id":"_:b11"},{"@id":"_:b12"},{"@id":"_:b13"}]},{"@id":"http://regen.network/ProjectPageStoryGroup","@type":["http://www.w3.org/ns/shacl#PropertyGroup"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Story"}],"http://www.w3.org/2000/01/rdf-schema#comment":[{"@value":"See an example <a href=\"\">project page»</a>"}],"http://www.w3.org/ns/shacl#order":[{"@value":"5","@type":"http://www.w3.org/2001/XMLSchema#decimal"}]},{"@id":"http://regen.network/ProjectQuoteShape","@type":["http://www.w3.org/2000/01/rdf-schema#Class","http://www.w3.org/ns/shacl#NodeShape"],"http://www.w3.org/ns/shacl#property":[{"@id":"_:b76"},{"@id":"_:b77"},{"@id":"_:b78"}]},{"@id":"http://regen.network/ProjectSizeShape","@type":["http://www.w3.org/2000/01/rdf-schema#Class","http://www.w3.org/ns/shacl#NodeShape"],"http://www.w3.org/2000/01/rdf-schema#label":[{"@value":"Size in hectares or acres"}],"http://www.w3.org/ns/shacl#property":[{"@id":"_:b63"},{"@id":"_:b64"}]},{"@id":"http://regen.network/SharePermissionShape","@type":["http://www.w3.org/ns/shacl#PropertyShape"],"http://www.w3.org/ns/shacl#path":[{"@id":"http://regen.network/sharePermission"}],"http://www.w3.org/ns/shacl#description":[{"@value":"I have this individual’s permission to share their information with Regen Registry"}],"http://www.w3.org/ns/shacl#datatype":[{"@id":"http://www.w3.org/2001/XMLSchema#boolean"}],"http://www.w3.org/ns/shacl#hasValue":[{"@value":true}]},{"@id":"http://regen.network/creditClass"},{"@id":"http://regen.network/galleryPhotos"},{"@id":"http://regen.network/landOwner"},{"@id":"http://regen.network/landSteward"},{"@id":"http://regen.network/landStewardPhoto"},{"@id":"http://regen.network/landStewardStory"},{"@id":"http://regen.network/landStewardStoryTitle"},{"@id":"http://regen.network/landStory"},{"@id":"http://regen.network/previewPhoto"},{"@id":"http://regen.network/projectDeveloper"},{"@id":"http://regen.network/projectQuote"},{"@id":"http://regen.network/quote"},{"@id":"http://regen.network/responsiblePerson"},{"@id":"http://regen.network/sharePermission"},{"@id":"http://regen.network/showOnProjectPage"},{"@id":"http://regen.network/size"},{"@id":"http://regen.network/videoURL"},{"@id":"http://schema.org/URL"},{"@id":"http://schema.org/description"},{"@id":"http://schema.org/email"},{"@id":"http://schema.org/image"},{"@id":"http://schema.org/jobTitle"},{"@id":"http://schema.org/legalName"},{"@id":"http://schema.org/location"},{"@id":"http://schema.org/logo"},{"@id":"http://schema.org/name"},{"@id":"http://schema.org/telephone"},{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#first"},{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"},{"@id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"},{"@id":"http://www.w3.org/2000/01/rdf-schema#Class"},{"@id":"http://www.w3.org/2000/01/rdf-schema#Resource"},{"@id":"http://www.w3.org/2001/XMLSchema#boolean"},{"@id":"http://www.w3.org/2001/XMLSchema#double"},{"@id":"http://www.w3.org/2001/XMLSchema#string"},{"@id":"http://www.w3.org/ns/shacl#IRI"},{"@id":"http://www.w3.org/ns/shacl#NodeShape"},{"@id":"http://www.w3.org/ns/shacl#PropertyGroup"},{"@id":"http://www.w3.org/ns/shacl#PropertyShape"},{"@id":"http://www.w3.org/ns/shacl#node"},{"@id":"https://purl.org/geojson/vocab#Feature"}],
                  },
                },
              },
            });
          }}
        >
          CLICK
        </button>
        <CookiesBanner privacyUrl="https://www.regen.network/privacy-policy/" />
        <footer>
          <AppFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
