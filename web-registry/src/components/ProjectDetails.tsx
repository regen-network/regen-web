import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import * as togeojson from '@mapbox/togeojson';
import { useLocation } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import clsx from 'clsx';

import { setPageView } from '../lib/ga';
import { useLedger, ContextType } from '../ledger';
import { Project, ProjectDefault, ActionGroup } from '../mocks';
import ProjectTop from './sections/ProjectTop';
import ProjectImpact from './sections/ProjectImpact';
import MoreProjects from './sections/MoreProjects';
import LandManagementActions from './sections/LandManagementActions';
import { getImgSrc } from '../lib/imgSrc';
import getApiUri from '../lib/apiUri';
import { buildIssuanceModalData } from '../lib/transform';

import { getFormattedDate } from 'web-components/lib/utils/format';
import Title from 'web-components/lib/components/title';
import Timeline from 'web-components/lib/components/timeline';
import ProjectMedia from 'web-components/lib/components/sliders/ProjectMedia';
import BuyFooter from 'web-components/lib/components/fixed-footer/BuyFooter';
import Table from 'web-components/lib/components/table';
import Modal from 'web-components/lib/components/modal';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import CreditsPurchaseForm from './CreditsPurchaseForm';
import Banner from 'web-components/lib/components/banner';
import SEO from 'web-components/lib/components/seo';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import IssuanceModal from 'web-components/lib/components/modal/IssuanceModal';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  projectContent: {
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
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
    '& h3': {
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
  timelineContainer: {
    backgroundColor: theme.palette.primary.main,
  },
  timelineTitle: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: `${theme.spacing(12)} !important`,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: `${theme.spacing(10)} !important`,
    },
  },
  creditDetails: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  tableBorder: {
    border: `2px solid ${theme.palette.secondary.dark}`,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
}));

interface ProjectProps {
  project: Project;
  projects: Project[];
  projectDefault: ProjectDefault;
}

const PROJECT_BY_HANDLE = loader('../graphql/ProjectByHandle.graphql');

export default function ProjectDetails({ projects, project, projectDefault }: ProjectProps): JSX.Element {
  const { api }: ContextType = useLedger();
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;
  let txClient: ServiceClientImpl | undefined;
  if (api) {
    txClient = new ServiceClientImpl(api.connection.queryConnection);
  }

  const { data } = useQuery(PROJECT_BY_HANDLE, {
    variables: { handle: project.id },
  });

  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setPageView(location);
  }, [location]);

  const classes = useStyles();
  const theme = useTheme();
  const landManagementActions: ActionGroup[] = project.landManagementActions.map(group => ({
    ...group,
    actions: group.actions.map(action => ({ ...action, imgSrc: getImgSrc(action.imgSrc) })),
  }));

  const otherProjects: Project[] = projects.filter(p => p.id !== project.id);

  const [geojson, setGeojson] = useState<any | null>(null);

  // Convert kml to geojson
  const mapFile: string = project.map;
  const isGISFile: boolean = /\.(json|kml)$/i.test(mapFile);

  if (!geojson && isGISFile) {
    fetch(mapFile)
      .then(r => r.text())
      .then(kml => {
        const dom = new DOMParser().parseFromString(kml, 'text/xml');
        setGeojson(togeojson.kml(dom));
      });
  }

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const [issuanceData, setIssuanceData] = useState<any | null>(null);

  const viewOnLedger = (creditVintage: any): void => {
    const issuanceData = buildIssuanceModalData(
      data.projectByHandle,
      data.projectByHandle.documentsByProjectId.nodes,
      creditVintage,
    );

    setIssuanceData(issuanceData);
  };

  const siteMetadata = {
    title: `Regen Network Registry`,
    description: `Learn about Regen Network's ${project.creditClass.name} credits sourced from ${project
      .steward?.name || project.developer?.name} in ${project.place.state}, ${project.place.country}.`,
    author: `Regen Network`,
    siteUrl: `${window.location.origin}/registry`,
  };

  return (
    <div className={classes.root}>
      <SEO location={location} siteMetadata={siteMetadata} title={project.name} imageUrl={project.image} />

      <ProjectMedia
        assets={project.media.filter(item => item.type === 'image')}
        gridView
        mobileHeight={theme.spacing(78.75)}
        imageStorageBaseUrl={imageStorageBaseUrl}
        apiServerUrl={apiServerUrl}
      />
      <ProjectTop project={project} projectDefault={projectDefault} geojson={geojson} isGISFile={isGISFile} />
      <ProjectImpact impacts={project.impact} />

      {/* {protectedSpecies.length > 0 && (
        <div
          className={`${classes.projectDetails} ${classes.projectContent} ${classes.projectImpactContainer}`}
        >
          <Title variant="h3">
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
      )} */}

      {data?.projectByHandle?.documentsByProjectId?.nodes?.length > 0 && (
        <div className={classes.creditDetails}>
          <div className={clsx(classes.projectDetails, classes.projectContent)}>
            <div className={classes.tableBorder}>
              <Table
                onViewOnLedger={viewOnLedger}
                rows={data.projectByHandle.documentsByProjectId.nodes.map(
                  (node: {
                    date: string;
                    type: string;
                    name?: string;
                    url?: string;
                    eventByEventId?: any;
                  }) => ({
                    date: node.date,
                    name: node.name,
                    type: node.type,
                    url: node.url,
                    creditVintage: node.eventByEventId?.creditVintageByEventId,
                  }),
                )}
              />
              {issuanceData && (
                <IssuanceModal
                  txClient={txClient}
                  open={!!issuanceData}
                  onClose={() => setIssuanceData(null)}
                  {...issuanceData}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {landManagementActions.map((actionsType, i) => (
        <div key={i} className={i > 0 ? classes.projectActionsGroup : ''}>
          <LandManagementActions
            actions={actionsType.actions}
            title={
              project.fieldsOverride && project.fieldsOverride.landManagementActions
                ? project.fieldsOverride.landManagementActions.title
                : projectDefault.landManagementActions.title
            }
            subtitle={actionsType.title || projectDefault.landManagementActions.subtitle}
          />
        </div>
      ))}

      {data &&
        data.projectByHandle &&
        data.projectByHandle.eventsByProjectId &&
        data.projectByHandle.eventsByProjectId.nodes.length > 0 && (
          <div className={clsx(classes.timelineContainer, 'project-background')}>
            <div className={`${classes.projectDetails} ${classes.projectTimeline} ${classes.projectContent}`}>
              <Title className={classes.timelineTitle} variant="h3">
                {project.fieldsOverride && project.fieldsOverride.timeline
                  ? project.fieldsOverride.timeline.title
                  : projectDefault.timeline.title}
              </Title>
              <Timeline
                txClient={txClient}
                events={data.projectByHandle.eventsByProjectId.nodes.map(
                  (node: {
                    // TODO use generated types from graphql schema
                    date: string;
                    summary: string;
                    description?: string;
                    creditVintageByEventId?: any;
                  }) => ({
                    modalData: buildIssuanceModalData(
                      data.projectByHandle,
                      data.projectByHandle.documentsByProjectId.nodes,
                      node.creditVintageByEventId,
                    ),
                    date: getFormattedDate(node.date, { year: 'numeric', month: 'long', day: 'numeric' }),
                    summary: node.summary,
                    description: node.description,
                  }),
                )}
              />
            </div>
          </div>
        )}

      {otherProjects.length > 0 && <MoreProjects projects={otherProjects} />}

      {project.creditPrice && <BuyFooter onClick={handleOpen} creditPrice={project.creditPrice} />}
      {project.creditPrice && project.stripePrice && (
        <Modal open={open} onClose={handleClose}>
          <CreditsPurchaseForm
            onClose={handleClose}
            creditPrice={project.creditPrice}
            stripePrice={project.stripePrice}
          />
          {/*<iframe title="airtable-presale-form" src={project.presaleUrl} />*/}
        </Modal>
      )}

      <FixedFooter justify="flex-end">
        <>
          <ContainedButton onClick={handleOpen} startIcon={<EmailIcon />}>
            send me more info
          </ContainedButton>
          {/* {<OutlinedButton className={classes.callButton} startIcon={<PhoneIcon />}>schedule a call</OutlinedButton>} */}
        </>
      </FixedFooter>
      <Modal open={open} onClose={handleClose}>
        <MoreInfoForm
          apiUrl={getApiUri()}
          onClose={handleClose}
          onSubmit={() => {
            handleClose();
            setSubmitted(true);
          }}
        />
      </Modal>
      {submitted && <Banner text="Thanks for submitting your information!" />}
    </div>
  );
}
