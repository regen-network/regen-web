import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import coorong from './assets/coorong.png';
import map from './assets/map.png';
import abu from './assets/abu.png';
import logo from './assets/logo.png';
import './App.css';

import Title from 'web-components/lib/components/title';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ProjectDeveloperCard from 'web-components/lib/components/card/ProjectDeveloperCard';
// import EcoPracticeCard from 'web-components/lib/components/card/EcoPracticeCard';
import Header from 'web-components/lib/components/header';
import Description from 'web-components/lib/components/description';
import ReadMore from 'web-components/lib/components/read-more';
import { User } from 'web-components/lib/components/user/UserInfo';


interface Practice {
  name: string;
  description: string;
}

interface Metholody {
  practices: Practice[];
}

interface CreditClass {
  name: string;
  description: string;
  place: string;
  outcome: string;
  numberOfHolders: number;
  numberOfProjects: number;
  amount: number;
  totalAmount: number;
  methodology: Metholody;
  imgSrc: string;
}

interface Project {
  name: string;
  place: string;
  area: number;
  developer: User;
  steward: User;
  summaryDescription: string;
  detailedDescription: string;
  creditClass: CreditClass;
}

const project: Project = {
  name: 'Coorong Project',
  place: 'Meningie, South Australia, Australia',
  area: 200,
  developer: {
    name: 'Odonota',
    place: 'South Melbourne, Victoria, Australia',
    imgSrc: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
    description: 'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
  },
  steward: {
    name: 'Ngarrindjeri Tribe',
    place: 'Southern Australia',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ngarrindjeri_Nation_Flag.svg/250px-Ngarrindjeri_Nation_Flag.svg.png',
    description: 'The Ngarrindjeri culture is centered around the lower lakes of the Murray River.',
  },
  summaryDescription:
    'This project is restoring and conserving a large area of native grassland in Southern Australia.',
  detailedDescription: 'This property is a rare pocket of wetlands and woodlands located near the township of Menindee South Australia, nestled in between the Coorong national park and Lake Albert.\n\nAs one of the few remaining sections of privately owned remnant vegetation in the area, this represents a unique opportunity for long term preservation. The Coorong, Lake Alexandrina and Lake Albert Wetland is an international significant RAMSAR wetland ecosystems at the intersection of the Murray River and Southern Ocean.\n\nThis vital habitat comprises a unique mix of both freshwater and saltwater wetlands and coastal woodlands. The Coorong is the heart of the traditional lands of Ngarrindjeri people, who have hunted and camped on the Mt Sandy property for thousands of years.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  creditClass: {
    name: "Australian Biodiversity Units (ABU's)",
    description:
      'An individual ABU represents a 1.5m square area of land of significant' +
      'environmental value that has been placed under a conservation covenant' +
      'and agreed management plan. The covenant and management plan secure' +
      'the long term preservation of the site and ensure the biodiversity value is' +
      'protected in perpetuity. Vegetation types may include forests, grasslands,' +
      'mallees, saltmarshes, scrubs, shrublands, wetlands, and woodlands.',
    place: 'Australia',
    outcome: 'biodiversity',
    numberOfHolders: 0,
    numberOfProjects: 1,
    amount: 0,
    totalAmount: 1000000,
    imgSrc: abu,
    methodology: {
      practices: [
        {
          name: 'Biodiversity',
          description: 'Fostering an increased number of species',
        },
      ],
    },
  },
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // background-color: #f8f8f8;
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
    backgroundColor: theme.palette.primary.main,
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
          <Description size="small">{project.summaryDescription}</Description>
          <div className={classes.projectDeveloper}>
            <ProjectDeveloperCard
              projectDeveloper={project.developer}
              landSteward={project.steward}
            />
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
      <div className={classes.projectStory}>
        <Title variant="h2">Timeline</Title>
      </div>
      <img alt={project.name} src={map} />
    </div>
  )
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
