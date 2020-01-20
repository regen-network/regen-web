import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import coorong from './assets/coorong.png';
import map from './assets/map.png';
import logo from './assets/logo.png';
import background from './assets/background.jpg';

import './App.css';
import { project, Project, Impact } from './mocks';

import { getFontSize } from 'web-components/lib/theme/sizing';
import Title from 'web-components/lib/components/title';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ProjectDeveloperCard from 'web-components/lib/components/cards/ProjectDeveloperCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import Header from 'web-components/lib/components/header';
import Description from 'web-components/lib/components/description';
import Action from 'web-components/lib/components/action';
import Timeline from 'web-components/lib/components/timeline';
import ReadMore from 'web-components/lib/components/read-more';
import CreditDetails from 'web-components/lib/components/credits/CreditDetails';
import ProtectedSpecies from 'web-components/lib/components/protected-species';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    '& img': {
      borderRadius: '5px',
      width: '100%',
    },
  },
  projectTop: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(15.5)} ${theme.spacing(25)}`,
    },
    backgroundSize: 'cover',
    borderTop: '1px solid #D2D5D9',
    borderBottom: '1px solid #D2D5D9',
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
      marginTop: theme.spacing(2.25),
    },
  },
  projectStory: {
    // backgroundColor: theme.palette.primary.main,
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
      padding: `${theme.spacing(17.25)} ${theme.spacing(61.75)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(11)} ${theme.spacing(3.75)}`,
    },
  },
  projectTimeline: {},
  projectDetails: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(17.25)} ${theme.spacing(32.25)} 0 ${theme.spacing(34.875)}`,
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
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.5),
    },
  },
  projectActionsGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
    },
  },
  projectGridItem: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(3.5)} ${theme.spacing(5.25)} ${theme.spacing(2.5)} 0`,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(13),
    },
  },
  projectImpactContainer: {
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
}));

interface ProjectProps {
  project: Project;
}

function ProjectDetails({ project }: ProjectProps): JSX.Element {
  const classes = useStyles({});
  const impact: Impact[] = project.creditClass.methodology.impact;
  const monitoredImpact: Impact | undefined = impact.find(({ monitored }) => monitored === true);

  if (monitoredImpact) {
    const monitoredIndex = impact.indexOf(monitoredImpact);
    impact.splice(monitoredIndex, 1);
  }

  return (
    <div className={classes.root}>
      <Grid container className={`${classes.projectTop} project-top`}>
        <Grid item xs={12} sm={6}>
          <img alt={project.name} src={coorong} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.projectTopText}>
          <Title variant="h1">{project.name}</Title>
          <div className={classes.projectPlace}>
            <ProjectPlaceInfo place={project.place} area={project.area} />
          </div>
          <Description fontSize={getFontSize('big')}>{project.summaryDescription}</Description>
          <div className={classes.projectDeveloper}>
            <ProjectDeveloperCard projectDeveloper={project.developer} landSteward={project.steward} />
          </div>
        </Grid>
      </Grid>
      <div className={classes.projectStory}>
        <div className={classes.projectStoryText}>
          <Title variant="h2">Story</Title>
          <ReadMore>{project.detailedDescription}</ReadMore>
        </div>
      </div>
      <img alt={project.name} src={map} />
      <Grid container className={classes.projectDetails}>
        {monitoredImpact && (
          <Grid item xs={12} sm={8}>
            <Title variant="h2">Monitored Impact</Title>
            <ImpactCard
              name={monitoredImpact.name}
              description={monitoredImpact.description}
              imgSrc={monitoredImpact.imgSrc}
              monitored
            />
          </Grid>
        )}
        {project.protectedSpecies && (
          <Grid item xs={12} sm={4} className={classes.protectedSpecies}>
            <Title variant="h3">Protected Species</Title>
            <ProtectedSpecies species={project.protectedSpecies} />
          </Grid>
        )}
      </Grid>
      <div className={classes.projectDetails}>
        <Title variant="h2">Non-monitored Impact</Title>
        <Description>
          These outcomes are natural by-products of the primary impact above, but will not be measured or
          verified.
        </Description>
        <Grid container className={classes.projectImpactContainer}>
          {impact.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              className={`${classes.projectGridItem} ${classes.projectImpact}`}
              key={`${index}-${item.name}`}
            >
              <ImpactCard name={item.name} description={item.description} imgSrc={item.imgSrc} />
            </Grid>
          ))}
        </Grid>
      </div>

      <div className={classes.projectDetails}>
        <CreditDetails
          name={project.creditClass.name}
          description={project.creditClass.description}
          activities={project.creditClass.activities}
          background={background}
        />
      </div>

      <div className={`${classes.projectDetails} ${classes.projectActions}`}>
        <Title variant="h2">Land Management Actions</Title>
        <Description>
          This is how the project developers are planning to achieve the primary impact.
        </Description>
        <Grid container className={classes.projectActionsGrid}>
          {project.creditClass.methodology.actions.map((action, index) => (
            <Grid item xs={12} sm={4} className={classes.projectGridItem} key={`${index}-${action.name}`}>
              <Action name={action.name} description={action.description} imgSrc={action.imgSrc} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="project-bottom">
        {/*<div className={classes.projectDetails}>
          <Title variant="h2">Monitoring, Verification, and Reporting</Title>
        </div>*/}
        <div className={classes.projectDetails}>
          <Title variant="h2">Timeline</Title>
          <Timeline events={project.timeline} />
        </div>
      </div>
    </div>
  );
}

// TODO: create component for project page
const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Header logo={logo} />
      <ProjectDetails project={project} />
    </div>
  );
};

export default App;
