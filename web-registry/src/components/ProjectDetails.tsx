import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import * as togeojson from '@mapbox/togeojson';
import Grid from '@material-ui/core/Grid';

import background from '../assets/background.jpg';
import { Project, Impact, ProjectDefault, ActionGroup } from '../mocks';

import { getFontSize } from 'web-components/lib/theme/sizing';
import Title from 'web-components/lib/components/title';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ProjectDeveloperCard from 'web-components/lib/components/cards/ProjectDeveloperCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import Description from 'web-components/lib/components/description';
// import Action from 'web-components/lib/components/action';
import Timeline from 'web-components/lib/components/timeline';
import ReadMore from 'web-components/lib/components/read-more';
import CreditDetails from 'web-components/lib/components/credits/CreditDetails';
import CreditsGauge from 'web-components/lib/components/credits/CreditsGauge';
import ProtectedSpecies from 'web-components/lib/components/sliders/ProtectedSpecies';
import NonMonitoredImpact from 'web-components/lib/components/sliders/NonMonitoredImpact';
import LandManagementActions from 'web-components/lib/components/sliders/LandManagementActions';
import ProjectMedia, { Media } from 'web-components/lib/components/sliders/ProjectMedia';
import Map from 'web-components/lib/components/map';
import { ItemProps as ProtectedSpeciesItem } from 'web-components/lib/components/sliders/Item';
import { User } from 'web-components/lib/components/user/UserInfo';
import BuyFooter from 'web-components/lib/components/buy-footer';
import MrvTabs from 'web-components/lib/components/tabs';
import Table from 'web-components/lib/components/table';
import Modal from 'web-components/lib/components/modal';
import CreditsPurchaseForm from './CreditsPurchaseForm';

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
      padding: `${theme.spacing(4.5)} ${theme.spacing(3.75)} ${theme.spacing(13)}`,
    },
  },
  projectPlace: {
    marginTop: theme.spacing(2.75),
    marginBottom: theme.spacing(2.75),
  },
  projectDeveloper: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6.5),
      paddingLeft: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
    },
  },
  projectStory: {
    '& h2': {
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(3.75),
      },
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(7.5),
    },
    // [theme.breakpoints.up('md')]: {
    //   padding: `${theme.spacing(17.25)} ${theme.spacing(60)}`,
    // },
    // [theme.breakpoints.down('sm')]: {
    //   padding: `${theme.spacing(17.25)} ${theme.spacing(22)}`,
    // },
    // [theme.breakpoints.down('xs')]: {
    //   padding: `${theme.spacing(11)} ${theme.spacing(3.75)}`,
    // },
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
      marginTop: theme.spacing(20),
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
      marginTop: theme.spacing(13),
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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(13),
    },
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
    '&:first-child': {
      marginTop: theme.spacing(6),
    },
  },
  creditsGauge: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3.75),
      marginBottom: theme.spacing(5),
    },
  },
  glanceCard: {
    marginTop: theme.spacing(5),
  },
  projectMedia: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(16),
      paddingRight: theme.spacing(7.5),
    },
  },
  monitoredImpact: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(7.5),
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

  const assets: Media[] = project.media.map(item => ({
    src: getImgSrc(item.src),
    thumbnail: getImgSrc(item.thumbnail),
    preview: getImgSrc(item.preview),
  }));

  const projectDeveloper: User = getProjectUser(project.developer);
  const landSteward: User = getProjectUser(project.steward);
  let landOwner: any;
  if (project.owner) {
    landOwner = getProjectUser(project.owner);
  }

  const [geojson, setGeojson] = useState<any | null>(null);

  // Convert kml to geojson
  const mapFile: string = require(`../assets/${project.map}`);
  const isGISFile: boolean = /\.(json|kml)$/i.test(project.map);

  if (!geojson && isGISFile) {
    fetch(mapFile)
      .then(r => r.text())
      .then(kml => {
        const dom = new DOMParser().parseFromString(kml, 'text/xml');
        setGeojson(togeojson.kml(dom));
      });
  }

  // Modal
  const [open, setOpen] = useState(true);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  // Credits Details and MRV table
  const creditDetails: JSX.Element = (
    <CreditDetails
      name={project.creditClass.name}
      description={project.creditClass.description}
      activities={project.keyOutcomesActivities}
      title={
        project.fieldsOverride && project.fieldsOverride.keyOutcomesActivities
          ? project.fieldsOverride.keyOutcomesActivities.title
          : projectDefault.keyOutcomesActivities.title
      }
    />
  );

  return (
    <div className={classes.root}>
      <div className={`${classes.projectTop} project-top`}>
        <Grid container className={`${classes.projectContent} ${classes.projectTopContent}`}>
          <Grid item xs={12} sm={7} className={classes.projectMedia}>
            {/*<img
              className={classes.projectTopImage}
              alt={project.name}
              src={require(`../assets/${project.photos[0]}`)}
            />*/}
            <ProjectMedia assets={assets} />
          </Grid>
          <Grid item xs={12} sm={5} className={classes.projectTopText}>
            <Title variant="h1">{project.name}</Title>
            <div className={classes.projectPlace}>
              <ProjectPlaceInfo place={project.place} area={project.area} areaUnit={project.areaUnit} />
            </div>
            <Description fontSize={getFontSize('big')}>{project.shortDescription}</Description>
            {project.credits && project.credits.issued > 0 && (
              <div className={classes.creditsGauge}>
                <CreditsGauge purchased={project.credits.purchased} issued={project.credits.issued} />
              </div>
            )}
            {project.glanceImgSrc && project.glanceText && (
              <div className={classes.glanceCard}>
                <GlanceCard imgSrc={require(`../assets/${project.glanceImgSrc}`)} text={project.glanceText} />
              </div>
            )}
          </Grid>
        </Grid>
      </div>

      <div className={`${classes.projectDetails} ${classes.projectContent}`}>
        <Grid container>
          <Grid item xs={12} sm={7} className={classes.projectStory}>
            <Title variant="h2">
              {project.fieldsOverride && project.fieldsOverride.story
                ? project.fieldsOverride.story.title
                : projectDefault.story.title}
            </Title>
            <ReadMore>{project.longDescription}</ReadMore>
          </Grid>
          <Grid item xs={12} sm={5}>
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

      <Grid container className={`${classes.projectDetails} ${classes.projectContent}`}>
        {monitoredImpact && (
          <Grid item xs={12} sm={7} className={classes.monitoredImpact}>
            <Title variant="h2">
              {project.fieldsOverride && project.fieldsOverride.monitoredImpact
                ? project.fieldsOverride.monitoredImpact.title
                : projectDefault.monitoredImpact.title}
            </Title>
            <ImpactCard
              name={monitoredImpact.name}
              description={monitoredImpact.description}
              imgSrc={monitoredImpact.imgSrc}
              monitored
            />
          </Grid>
        )}
        {protectedSpecies.length > 0 ? (
          <Grid item xs={12} sm={5} className={classes.protectedSpecies}>
            <Title variant="h2">
              {project.fieldsOverride && project.fieldsOverride.protectedSpecies
                ? project.fieldsOverride.protectedSpecies.title
                : projectDefault.protectedSpecies.title}
            </Title>
            <ProtectedSpecies species={protectedSpecies} />
          </Grid>
        ) : (
          <Grid item xs={12} sm={5} className={classes.protectedSpecies}>
            <Title variant="h2">
              {project.fieldsOverride && project.fieldsOverride.nonMonitoredImpact
                ? project.fieldsOverride.nonMonitoredImpact.title
                : projectDefault.nonMonitoredImpact.title}
            </Title>
            {/*<Description fontSize={getFontSize('project')}>
              {project.fieldsOverride &&
              project.fieldsOverride.nonMonitoredImpact &&
              project.fieldsOverride.nonMonitoredImpact.subtitle
                ? project.fieldsOverride.nonMonitoredImpact.subtitle
                : projectDefault.nonMonitoredImpact.subtitle}
            </Description>*/}
            <NonMonitoredImpact impact={impact} />
          </Grid>
        )}
      </Grid>

      {protectedSpecies.length > 0 && (
        <div
          className={`${classes.projectDetails} ${classes.projectContent} ${classes.projectImpactContainer}`}
        >
          <Title variant="h2">
            {project.fieldsOverride && project.fieldsOverride.nonMonitoredImpact
              ? project.fieldsOverride.nonMonitoredImpact.title
              : projectDefault.nonMonitoredImpact.title}
          </Title>
          <Description>
            {project.fieldsOverride &&
            project.fieldsOverride.nonMonitoredImpact &&
            project.fieldsOverride.nonMonitoredImpact.subtitle
              ? project.fieldsOverride.nonMonitoredImpact.subtitle
              : projectDefault.nonMonitoredImpact.subtitle}
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

      {!project.hideCreditDetails && (
        <div className={`${classes.projectDetails} ${classes.projectContent}`}>
          {project.documents.length > 0 ? (
            <MrvTabs
              tabs={[
                {
                  label: 'Overview',
                  children: creditDetails,
                },
                {
                  label: 'Documentation',
                  children: <Table rows={project.documents} />,
                },
              ]}
              background={background}
            />
          ) : (
            creditDetails
          )}
        </div>
      )}

      <div className={`project-background`}>
        <div
          className={`${classes.projectTopContent} ${classes.projectDetails} ${classes.projectActions} ${classes.projectContent}`}
        >
          <Title variant="h2">
            {project.fieldsOverride && project.fieldsOverride.landManagementActions
              ? project.fieldsOverride.landManagementActions.title
              : projectDefault.landManagementActions.title}
          </Title>
          {landManagementActions.map((actionsType, i) => (
            <div key={i} className={i > 0 ? classes.projectActionsGroup : ''}>
              <Description
                fontSize={
                  landManagementActions.length > 1 ? { xs: '0.95rem', sm: '1.125rem' } : getFontSize('medium')
                }
              >
                {actionsType.title || projectDefault.landManagementActions.subtitle}
              </Description>
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
      </div>

      {geojson && isGISFile ? (
        <Map geojson={geojson} token={process.env.REACT_APP_MAPBOX_TOKEN} />
      ) : (
        <img className={classes.map} alt={project.name} src={mapFile} />
      )}

      {project.timeline && (
        <div>
          {/*<div className={classes.projectDetails}>
          <Title variant="h2">Monitoring, Verification, and Reporting</Title>
        </div>*/}
          <div className={`${classes.projectDetails} ${classes.projectTimeline} ${classes.projectContent}`}>
            <Title variant="h2">
              {project.fieldsOverride && project.fieldsOverride.timeline
                ? project.fieldsOverride.timeline.title
                : projectDefault.timeline.title}
            </Title>
            <Timeline
              events={project.timeline.events}
              completedItemIndex={project.timeline.completedItemIndex}
            />
          </div>
        </div>
      )}

      {project.presaleUrl && (
        <div className={classes.buyFooter}>
          <BuyFooter onClick={handleOpen} creditPrice={project.creditPrice} />
        </div>
      )}

      {project.creditPrice && project.stripePrice && (
        <Modal open={open} onClose={handleClose}>
          <CreditsPurchaseForm creditPrice={project.creditPrice} stripePrice={project.stripePrice} />
          {/*<iframe title="airtable-presale-form" src={project.presaleUrl} />*/}
        </Modal>
      )}
    </div>
  );
}
