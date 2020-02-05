import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';

import map from './assets/map.png';
import logo from './assets/logo.png';
import background from './assets/background.jpg';

import './App.css';
import { projects, creditsIssuer, Project, Impact } from './mocks';

import { getFontSize } from 'web-components/lib/theme/sizing';
import Title from 'web-components/lib/components/title';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ProjectDeveloperCard from 'web-components/lib/components/cards/ProjectDeveloperCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import Header from 'web-components/lib/components/header';
import Description from 'web-components/lib/components/description';
import Action from 'web-components/lib/components/action';
import Timeline from 'web-components/lib/components/timeline';
import Footer from 'web-components/lib/components/footer';
import ReadMore from 'web-components/lib/components/read-more';
import CreditDetails from 'web-components/lib/components/credits/CreditDetails';
import ProtectedSpecies from 'web-components/lib/components/protected-species';
import { ItemProps as ProtectedSpeciesItem } from 'web-components/lib/components/protected-species/Item';
import { User } from 'web-components/lib/components/user/UserInfo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    '& img': {
      width: '100%',
    },
  },
  projectTop: {
    backgroundSize: 'cover',
    borderTop: '1px solid #D2D5D9',
    borderBottom: '1px solid #D2D5D9',
  },
  projectContent: {
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
  projectTopContent: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(15.5)} ${theme.spacing(25)}`,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
  },
  projectTopText: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(4.5)} ${theme.spacing(3.75)}`,
    },
  },
  projectPlace: {
    marginTop: theme.spacing(2.75),
    marginBottom: theme.spacing(2.75),
  },
  projectDeveloper: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
    },
  },
  projectStoryText: {
    '& h2': {
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(3.75),
      },
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(17.25)} ${theme.spacing(40)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(11)} ${theme.spacing(3.75)}`,
    },
  },
  projectDetails: {
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      paddingLeft: theme.spacing(34.875),
      paddingRight: theme.spacing(32.25),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(17.25),
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(13)} ${theme.spacing(3.75)} 0`,
    },
    '& h2': {
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(7),
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(3.25),
      },
    },
  },
  projectActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      paddingRight: theme.spacing(27.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: 0,
    },
  },
  projectGrid: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(-2.5),
    },
  },
  projectActionsGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
    },
  },
  projectGridItem: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(3.5)} ${theme.spacing(2.5)} ${theme.spacing(2.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(8),
    },
  },
  projectImpactContainer: {
    [theme.breakpoints.between('sm', 'lg')]: {
      paddingRight: theme.spacing(27.25),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: 0,
    },
  },
  projectImpactGrid: {
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'nowrap',
      overflowX: 'auto',
    },
  },
  projectImpact: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flex: '0 0 auto',
      marginRight: theme.spacing(4),
      width: '80%',
    },
  },
  protectedSpecies: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(5),
    },
    '& h3': {
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(7),
        marginTop: theme.spacing(2.5),
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(3.25),
        marginTop: theme.spacing(8.5),
      },
    },
  },
  projectTimeline: {
    paddingBottom: theme.spacing(30.5),
  },
  buyFooter: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    width: '100%',
    zIndex: 1000,
  },
  map: {
    maxHeight: '50rem',
    borderRadius: 'none',
  },
}));

interface ProjectProps {
  project: Project;
}

function validURL(str: string): boolean {
  return str.startsWith('http');
}

function getImgSrc(imgSrc: string): string {
  if (!validURL(imgSrc)) {
    return require(`./assets/${imgSrc}`);
  }
  return imgSrc;
}

function getProjectUser(projectUser: User): User {
  const user: User = {
    name: projectUser.name,
    description: projectUser.description,
  };
  if (projectUser.imgSrc) {
    user.imgSrc = getImgSrc(projectUser.imgSrc);
  }
  return user;
}

function ProjectDetails({ project }: ProjectProps): JSX.Element {
  const classes = useStyles({});
  const impact: Impact[] = project.impact;
  const monitoredImpact: Impact | undefined = impact.find(({ monitored }) => monitored === true);

  if (monitoredImpact) {
    const monitoredIndex = impact.indexOf(monitoredImpact);
    impact.splice(monitoredIndex, 1);
  }

  let protectedSpecies: ProtectedSpeciesItem[] = [];
  if (project.protectedSpecies) {
    protectedSpecies = project.protectedSpecies.map(item => ({
      name: item.name,
      imgSrc: getImgSrc(item.imgSrc),
    }));
  }

  const projectDeveloper: User = getProjectUser(project.developer);
  const landSteward: User = getProjectUser(project.steward);

  return (
    <div className={classes.root}>
      <div className={`${classes.projectTop} project-top`}>
        <Grid container className={`${classes.projectContent} ${classes.projectTopContent}`}>
          <Grid item xs={12} sm={6}>
            <img alt={project.name} src={require(`./assets/${project.photos[0]}`)} />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.projectTopText}>
            <Title variant="h1">{project.name}</Title>
            <div className={classes.projectPlace}>
              <ProjectPlaceInfo place={project.place} area={project.area} areaUnit={project.areaUnit} />
            </div>
            <Description fontSize={getFontSize('big')}>{project.shortDescription}</Description>
            <div className={classes.projectDeveloper}>
              <ProjectDeveloperCard projectDeveloper={projectDeveloper} landSteward={landSteward} />
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={classes.projectContent}>
        <div className={classes.projectStoryText}>
          <Title variant="h2">Story</Title>
          <ReadMore>{project.longDescription}</ReadMore>
        </div>
      </div>

      <img className={classes.map} alt={project.name} src={map} />

      <Grid container className={`${classes.projectDetails} ${classes.projectContent}`}>
        {monitoredImpact && (
          <Grid item xs={12} sm={8}>
            <Title variant="h2">Monitored Impact</Title>
            <ImpactCard
              name={monitoredImpact.name}
              description={monitoredImpact.description}
              imgSrc={require(`./assets/${monitoredImpact.imgSrc}`)}
              monitored
            />
          </Grid>
        )}
        {protectedSpecies && (
          <Grid item xs={12} sm={4} className={classes.protectedSpecies}>
            <Title variant="h3">Protected Species</Title>
            <ProtectedSpecies species={protectedSpecies} />
          </Grid>
        )}
      </Grid>

      <div
        className={`${classes.projectDetails} ${classes.projectContent} ${classes.projectImpactContainer}`}
      >
        <Title variant="h2">Non-monitored Impact</Title>
        <Description>
          These outcomes are natural by-products of the primary impact above, but will not be measured or
          verified.
        </Description>
        <Grid container className={`${classes.projectGrid} ${classes.projectImpactGrid}`}>
          {impact.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              className={`${classes.projectGridItem} ${classes.projectImpact}`}
              key={`${index}-${item.name}`}
            >
              <ImpactCard
                name={item.name}
                description={item.description}
                imgSrc={require(`./assets/${item.imgSrc}`)}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <div className={`${classes.projectDetails} ${classes.projectContent}`}>
        <CreditDetails
          name={project.creditClass.name}
          description={project.creditClass.description}
          activities={project.keyOutcomesActivities}
          background={background}
        />
      </div>

      <div className={`${classes.projectDetails} ${classes.projectActions} ${classes.projectContent}`}>
        <Title variant="h2">Land Management Actions</Title>
        <Description>
          This is how the project developers are planning to achieve the primary impact.
        </Description>
        <Grid container className={`${classes.projectGrid} ${classes.projectActionsGrid}`}>
          {project.landManagementActions.map((action, index) => (
            <Grid item xs={12} sm={4} className={classes.projectGridItem} key={`${index}-${action.name}`}>
              <Action
                name={action.name}
                description={action.description}
                imgSrc={require(`./assets/${action.imgSrc}`)}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="project-bottom">
        {/*<div className={classes.projectDetails}>
          <Title variant="h2">Monitoring, Verification, and Reporting</Title>
        </div>*/}
        <div className={`${classes.projectDetails} ${classes.projectTimeline} ${classes.projectContent}`}>
          <Title variant="h2">Timeline</Title>
          <Timeline events={project.timeline} />
        </div>
      </div>
    </div>
  );
}

function Home(): JSX.Element {
  return (
    <div>
      <Link to="/p">Project list</Link>
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
  let { url } = useRouteMatch();

  return (
    <div>
      <ul>
        {projects.map((p, i) => (
          <li key={p.id}>
            <Link key={i} to={`${url}/${p.id}`}>
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// TODO: create component for project page
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
            path="/p"
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
