import React, { useEffect } from 'react';
import { Router, Switch, Route, Link, useParams, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useAuth0 } from './react-auth0-spa';

import logo from './assets/logo.png';

import './App.css';
import {
  projects,
  creditsIssuer,
  purchasedCredits,
  projectDefault,
  Project,
  PurchasedCredits,
} from './mocks';
import Footer from 'web-components/lib/components/footer';
import Header from 'web-components/lib/components/header';
import ProjectDetails from './components/ProjectDetails';
import ProjectList from './components/ProjectList';
import UserCredits from './components/UserCredits';
import CreditsIssue from './components/CreditsIssue';
import history from './lib/history';

function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Home(): JSX.Element {
  return (
    <div style={{ paddingLeft: '1rem' }}>
      <p>
        <Link to="/projects">Project list</Link>
      </p>
      <p>
        <Link to="/credits/userId">Credits page</Link>
      </p>
    </div>
  );
}

function CreditsContainer(): JSX.Element {
  let { userId } = useParams();
  const userCredits: PurchasedCredits | undefined = purchasedCredits.find(p => p.userId === userId);
  if (userCredits) {
    return <UserCredits credits={userCredits} />;
  }
  return <div>User not found</div>;
}

function ProjectContainer(): JSX.Element {
  let { projectId } = useParams();
  const project: Project | undefined = projects.find(p => p.id === projectId);

  if (project) {
    return <ProjectDetails project={project} projectDefault={projectDefault} />;
  }
  return <div>No project found</div>;
}

function Projects(): JSX.Element {
  return <ProjectList projects={projects} />;
}

function Admin(): JSX.Element {
  // TODO Add authentication with auth0
  return (
    <div style={{ paddingLeft: '1rem' }}>
      <p>
        <Link to="/admin/credits/issue">Issue Credits</Link>
      </p>
    </div>
  );
}

const App: React.FC = (): JSX.Element => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router history={history}>
      <ScrollToTop />
      <div>
        <Header logo={logo}>
          <NavBar />
        </Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/projects"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}`} component={Projects} exact />
                <Route path={`${path}/:projectId`} component={ProjectContainer} />
              </>
            )}
          />
          <Route
            path="/credits"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/:userId`} component={CreditsContainer} />
              </>
            )}
          />
          <Route
            path="/admin"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}`} component={Admin} exact />
                <Route path={`${path}/credits/issue`} component={CreditsIssue} />
              </>
            )}
          />
        </Switch>
        <footer>
          <Footer user={creditsIssuer} />
        </footer>
      </div>
    </Router>
  );
};

export default App;
