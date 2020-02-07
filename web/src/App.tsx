import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

import logo from './assets/logo.png';

import './App.css';
import { projects, creditsIssuer, Project } from './mocks';
import Footer from 'web-components/lib/components/footer';
import Header from 'web-components/lib/components/header';
import ProjectDetails from './components/ProjectDetails';
import ProjectList from './components/ProjectList';

function Home(): JSX.Element {
  return (
    <div>
      <Link to="/projects">Project list</Link>
    </div>
  );
}

function ProjectContainer(): JSX.Element {
  let { projectId } = useParams();
  const project: Project | undefined = projects.find(p => p.id === projectId);

  if (project) {
    return <ProjectDetails project={project} />;
  }
  return <div>No project found</div>;
}

function Projects(): JSX.Element {
  return <ProjectList projects={projects} />;
}

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <div>
        <Header logo={logo} />
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
        </Switch>
        <footer>
          <Footer user={creditsIssuer} />
        </footer>
      </div>
    </Router>
  );
};

export default App;
