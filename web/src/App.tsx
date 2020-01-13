import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import coorong from './assets/coorong.png';
import map from './assets/map.png';
import logo from './assets/logo.png';
import './App.css';
import { project, Project } from './mocks';

import { getFontSize } from 'web-components/lib/theme/sizing';
import Title from 'web-components/lib/components/title';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ProjectDeveloperCard from 'web-components/lib/components/card/ProjectDeveloperCard';
// import EcoPracticeCard from 'web-components/lib/components/card/EcoPracticeCard';
import Header from 'web-components/lib/components/header';
import Description from 'web-components/lib/components/description';
import Action from 'web-components/lib/components/action';
import ReadMore from 'web-components/lib/components/read-more';

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
    backgroundColor: '#f9f9f9', // TODO add colors to palette
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
  projectActions: {
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
        marginBottom: theme.spacing(1.75),
      },
    },
  },
  projectActionsGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
    },
  },
  projectAction: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(3.5)} ${theme.spacing(5.25)} ${theme.spacing(2.5)} 0`,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(13),
    },
  },
}));

interface ProjectProps {
  project: Project;
}

function ProjectDetails({ project }: ProjectProps): JSX.Element {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <Grid container className={classes.projectTop}>
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
      {/*<div className="project-content">
        <Title variant="h2">Ecological Practices</Title>
        <div>
          {project.creditClass.methodology.practices.map(practice => (
            <EcoPracticeCard
              name={practice.name}
              description={practice.description}
              imgSrc={biodiversity}
            />
          ))}
        </div>
      </div>*/}
      <div className={classes.projectStory}>
        <div className={classes.projectStoryText}>
          <Title variant="h2">Story</Title>
          <ReadMore>{project.detailedDescription}</ReadMore>
        </div>
      </div>
      <div className={classes.projectTimeline}>
        <Title variant="h2">Timeline</Title>
      </div>
      <img alt={project.name} src={map} />
      <div className={classes.projectActions}>
        <Title variant="h2">Land Management Actions</Title>
        <Description>
          This is how the project developers are planning to achieve the primary impact.
        </Description>
        <Grid container className={classes.projectActionsGrid}>
          {project.creditClass.methodology.actions.map((action, index) => (
            <Grid item xs={12} sm={4} className={classes.projectAction}>
              <Action name={action.name} description={action.description} imgSrc={action.imgSrc} />
            </Grid>
          ))}
        </Grid>
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
