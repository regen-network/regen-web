import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import background from '../assets/background.jpg';
import { Project, Impact, ProjectDefault, ActionGroup } from '../mocks';

import { getFontSize } from 'web-components/lib/theme/sizing';
import Title from 'web-components/lib/components/title';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ProjectDeveloperCard from 'web-components/lib/components/cards/ProjectDeveloperCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import Description from 'web-components/lib/components/description';
// import Action from 'web-components/lib/components/action';
import Timeline from 'web-components/lib/components/timeline';
import ReadMore from 'web-components/lib/components/read-more';
import CreditDetails from 'web-components/lib/components/credits/CreditDetails';
import ProtectedSpecies from 'web-components/lib/components/sliders/ProtectedSpecies';
import NonMonitoredImpact from 'web-components/lib/components/sliders/NonMonitoredImpact';
import LandManagementActions from 'web-components/lib/components/sliders/LandManagementActions';
import { ItemProps as ProtectedSpeciesItem } from 'web-components/lib/components/sliders/Item';
import { User } from 'web-components/lib/components/user/UserInfo';
import { getImgSrc } from '../lib/imgSrc';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    '& img': {
      width: '100%',
    },
  },
  projectTop: {
    backgroundSize: 'cover',
    borderTop: `1px solid ${theme.palette.grey[50]}`,
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
  },
  projectContent: {
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
  projectTopImage: {
    [theme.breakpoints.up('sm')]: {
      borderRadius: '5px',
    },
  },
  projectTopContent: {
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(15.5)} ${theme.spacing(37)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(15.5)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
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
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(17.25)} ${theme.spacing(60)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(17.25)} ${theme.spacing(22)}`,
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
    [theme.breakpoints.between('md', 'lg')]: {
      paddingLeft: theme.spacing(35.875),
      paddingRight: theme.spacing(35.875),
      // paddingRight: theme.spacing(33.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
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
    [theme.breakpoints.between('md', 'lg')]: {
      paddingRight: theme.spacing(33.375),
    },
    // [theme.breakpoints.down('sm')]: {
    [theme.breakpoints.between('sm', 'sm')]: {
      paddingRight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(2.5),
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
    [theme.breakpoints.between('md', 'lg')]: {
      paddingRight: theme.spacing(30.375),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(5),
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
    '& h4': {
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
  },
  projectActionsGroup: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6),
    },
  },
}));

interface ProjectProps {
  project: Project;
  projectDefault: ProjectDefault;
}

function getProjectUser(projectUser: User): User {
  const user: User = {
    name: projectUser.name,
    description: projectUser.description,
    place: projectUser.place,
    type: projectUser.type,
  };
  if (projectUser.imgSrc) {
    user.imgSrc = getImgSrc(projectUser.imgSrc);
  }
  return user;
}

export default function ProjectDetails({ project, projectDefault }: ProjectProps): JSX.Element {
  const classes = useStyles({});
  const impact: Impact[] = project.impact.map(item => ({ ...item, imgSrc: getImgSrc(item.imgSrc) }));
  const landManagementActions: ActionGroup[] = project.landManagementActions.map(group => ({
    ...group,
    actions: group.actions.map(action => ({ ...action, imgSrc: getImgSrc(action.imgSrc) })),
  }));
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
  let landOwner: any;
  if (project.owner) {
    landOwner = getProjectUser(project.owner);
  }

  return (
    <div className={classes.root}>
      <div className={`${classes.projectTop} project-top`}>
        <Grid container className={`${classes.projectContent} ${classes.projectTopContent}`}>
          <Grid item xs={12} sm={6}>
            <img
              className={classes.projectTopImage}
              alt={project.name}
              src={require(`../assets/${project.photos[0]}`)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.projectTopText}>
            <Title variant="h1">{project.name}</Title>
            <div className={classes.projectPlace}>
              <ProjectPlaceInfo place={project.place} area={project.area} areaUnit={project.areaUnit} />
            </div>
            <Description fontSize={getFontSize('big')}>{project.shortDescription}</Description>
            <div className={classes.projectDeveloper}>
              <ProjectDeveloperCard
                projectDeveloper={projectDeveloper}
                landSteward={landSteward}
                landOwner={landOwner}
              />
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

      <img className={classes.map} alt={project.name} src={require(`../assets/${project.map}`)} />

      <Grid container className={`${classes.projectDetails} ${classes.projectContent}`}>
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
        {protectedSpecies.length > 0 ? (
          <Grid item xs={12} sm={4} className={classes.protectedSpecies}>
            <Title variant="h4">Protected Species</Title>
            <ProtectedSpecies species={protectedSpecies} />
          </Grid>
        ) : (
          <Grid item xs={12} sm={4} className={classes.protectedSpecies}>
            <Title variant="h4">Non-monitored Impact</Title>
            <Description fontSize={getFontSize('project')}>
              These outcomes are natural by-products of the primary impact above, but will not be measured or
              verified.
            </Description>
            <NonMonitoredImpact impact={impact} />
          </Grid>
        )}
      </Grid>

      {protectedSpecies.length > 0 && (
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
                <ImpactCard name={item.name} description={item.description} imgSrc={item.imgSrc} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      <div className={`${classes.projectDetails} ${classes.projectContent}`}>
        <CreditDetails
          name={project.creditClass.name}
          description={project.creditClass.description}
          activities={project.keyOutcomesActivities}
          background={background}
        />
      </div>

      <div className={`${classes.projectDetails} ${classes.projectActions} ${classes.projectContent}`}>
        <Title variant="h2">{projectDefault.landManagementActions.title}</Title>
        {landManagementActions.map((actionsType, i) => (
          <div key={i} className={i > 0 ? classes.projectActionsGroup : ''}>
            <Description>{actionsType.title || projectDefault.landManagementActions.subtitle}</Description>
            <LandManagementActions actions={actionsType.actions} />

            {/*<div className={`${classes.projectGrid} ${classes.projectActionsGrid}`}>
              {actionsType.actions.map((action, j) => (
                <Grid item xs={12} sm={4} className={classes.projectGridItem} key={`${j}-${action.name}`}>
                  <Action
                    name={action.name}
                    description={action.description}
                    imgSrc={require(`../assets/${action.imgSrc}`)}
                  />
                </Grid>
              ))
            </div>*/}
          </div>
        ))}
      </div>

      <div className="project-bottom">
        {/*<div className={classes.projectDetails}>
          <Title variant="h2">Monitoring, Verification, and Reporting</Title>
        </div>*/}
        <div className={`${classes.projectDetails} ${classes.projectTimeline} ${classes.projectContent}`}>
          <Title variant="h2">Timeline</Title>
          <Timeline
            events={project.timeline.events}
            completedItemIndex={project.timeline.completedItemIndex}
          />
        </div>
      </div>
    </div>
  );
}
