import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import * as togeojson from '@mapbox/togeojson';
import { useLocation } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import clsx from 'clsx';

import { getFormattedDate } from 'web-components/lib/utils/format';
import IssuanceModal, { IssuanceModalData } from 'web-components/lib/components/modal/IssuanceModal';
import Title from 'web-components/lib/components/title';
import Timeline from 'web-components/lib/components/timeline';
import ProjectMedia from 'web-components/lib/components/sliders/ProjectMedia';
import BuyFooter from 'web-components/lib/components/fixed-footer/BuyFooter';
import Modal from 'web-components/lib/components/modal';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import Banner from 'web-components/lib/components/banner';
import SEO from 'web-components/lib/components/seo';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';

import { setPageView } from '../../lib/ga';
import { getImgSrc } from '../../lib/imgSrc';
import getApiUri from '../../lib/apiUri';
import { buildIssuanceModalData } from '../../lib/transform';
import { useLedger, ContextType } from '../../ledger';
import { Project, ProjectDefault, ActionGroup } from '../../mocks';
import {
  Documentation,
  ProjectTopSection,
  ProjectImpactSection,
  MoreProjectsSection,
  CreditsPurchaseForm,
  LandManagementActions,
  BuyCreditsModal,
} from '../organisms';

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
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17),
    },
  },
  timelineTitle: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
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
  projects: Project[];
  projectDefault: ProjectDefault;
}

const PROJECT_BY_HANDLE = loader('../../graphql/ProjectByHandle.graphql');

function ProjectDetails({ projects, project, projectDefault }: ProjectProps): JSX.Element {
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

  const styles = useStyles();
  const theme = useTheme();
  const landManagementActions: ActionGroup[] | undefined = project.landManagementActions?.map(group => ({
    ...group,
    actions: group.actions.map(action => ({ ...action, imgSrc: getImgSrc(action.imgSrc) })),
  }));

  const otherProjects: Project[] = projects.filter(p => p.id !== project.id);

  const [geojson, setGeojson] = useState<any | null>(null);

  // Convert kml to geojson
  const mapFile: string = project.map;
  const isGISFile: boolean = /\.(json|kml)$/i.test(mapFile);
  const isKMLFile: boolean = /\.kml$/i.test(mapFile);

  if (!geojson && isGISFile) {
    fetch(mapFile)
      .then(r => r.text())
      .then(text => {
        let geojson;
        if (isKMLFile) {
          const dom = new DOMParser().parseFromString(text, 'text/xml');
          geojson = togeojson.kml(dom);
        } else {
          geojson = JSON.parse(text);
        }
        setGeojson(geojson);
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

  const [issuanceModalData, setIssuanceModalData] = useState<IssuanceModalData | null>(null);
  const [issuanceModalOpen, setIssuanceModalOpen] = useState(false);
  const [isBuyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false);

  const viewOnLedger = (creditVintage: any): void => {
    if (creditVintage?.txHash) {
      if (creditVintage.txHash !== issuanceModalData?.txHash) {
        const issuanceData = buildIssuanceModalData(
          data.projectByHandle,
          data.projectByHandle.documentsByProjectId.nodes,
          creditVintage,
        );

        setIssuanceModalData(issuanceData);
      }
      setIssuanceModalOpen(true);
    }
  };

  const siteMetadata = {
    title: `Regen Network Registry`,
    description: `Learn about Regen Network's ${project.creditClass.name} credits sourced from ${project
      .steward?.name || project.developer?.name} in ${project.place.state}, ${project.place.country}.`,
    author: `Regen Network`,
    siteUrl: `${window.location.origin}/registry`,
  };

  // TODO: ### for UI testing. Delete  below before merge! #######
  project.creditPrice = { unitPrice: 15.12, currency: 'USD' };
  project.credits = {
    issued: 10000,
    purchased: 7500,
  };
  // ###### DELETE mock price data above ####

  return (
    <div className={styles.root}>
      <SEO location={location} siteMetadata={siteMetadata} title={project.name} imageUrl={project.image} />

      <ProjectMedia
        assets={project.media.filter(item => item.type === 'image')}
        gridView
        mobileHeight={theme.spacing(78.75)}
        imageStorageBaseUrl={imageStorageBaseUrl}
        apiServerUrl={apiServerUrl}
        imageCredits={project.imageCredits}
      />
      <ProjectTopSection
        project={project}
        projectDefault={projectDefault}
        geojson={geojson}
        isGISFile={isGISFile}
      />
      <div className="topo-background-alternate">
        <ProjectImpactSection impacts={project.impact} />
      </div>

      {/* {protectedSpecies.length > 0 && (
        <div
          className={`${styles.projectDetails} ${styles.projectContent} ${styles.projectImpactContainer}`}
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
          <Grid container className={`${styles.projectGrid} ${styles.projectImpactGrid}`}>
            {impact.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={4}
                className={`${styles.projectGridItem} ${styles.projectImpact}`}
                key={`${index}-${item.name}`}
              >
                <ImpactCard name={item.name} description={item.description} imgSrc={item.imgSrc} />
              </Grid>
            ))}
          </Grid>
        </div>
      )} */}

      {data?.projectByHandle?.documentsByProjectId?.nodes?.length > 0 && (
        <div className={clsx('topo-background-alternate', styles.projectContent)}>
          <Documentation
            txClient={txClient}
            onViewOnLedger={viewOnLedger}
            documents={data.projectByHandle.documentsByProjectId.nodes}
          />
        </div>
      )}

      {landManagementActions &&
        landManagementActions.map((actionsType, i) => (
          <div key={i} className={clsx('topo-background-alternate', i > 0 ? styles.projectActionsGroup : '')}>
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

      {data?.projectByHandle?.eventsByProjectId?.nodes?.length > 0 && (
        <div
          className={clsx(
            'topo-background-alternate',
            styles.projectDetails,
            styles.projectTimeline,
            styles.projectContent,
          )}
        >
          <Title className={styles.timelineTitle} variant="h2">
            {project.fieldsOverride && project.fieldsOverride.timeline
              ? project.fieldsOverride.timeline.title
              : projectDefault.timeline.title}
          </Title>
          <Timeline
            txClient={txClient}
            onViewOnLedger={viewOnLedger}
            events={data.projectByHandle.eventsByProjectId.nodes.map(
              (node: {
                // TODO use generated types from graphql schema
                date: string;
                summary: string;
                description?: string;
                creditVintageByEventId?: any;
              }) => ({
                date: getFormattedDate(node.date, { year: 'numeric', month: 'long', day: 'numeric' }),
                summary: node.summary,
                description: node.description,
                creditVintage: node.creditVintageByEventId,
              }),
            )}
          />
        </div>
      )}

      {otherProjects.length > 0 && (
        <div className="topo-background-alternate">
          <MoreProjectsSection projects={otherProjects} />
        </div>
      )}

      {project.creditPrice && (
        <BuyFooter onClick={() => setBuyCreditsModalOpen(true)} creditPrice={project.creditPrice} />
      )}
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

      {!project.creditPrice && (
        <FixedFooter justify="flex-end">
          <>
            <ContainedButton onClick={handleOpen} startIcon={<EmailIcon />}>
              send me more info
            </ContainedButton>
            {/*
            <OutlinedButton className={styles.callButton} startIcon={<PhoneIcon />}>
              schedule a call
            </OutlinedButton>
          */}
          </>
        </FixedFooter>
      )}
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
      {issuanceModalData && (
        <IssuanceModal
          txClient={txClient}
          open={issuanceModalOpen}
          onClose={() => setIssuanceModalOpen(false)}
          {...issuanceModalData}
        />
      )}
      {project.creditPrice && (
        <BuyCreditsModal
          open={isBuyCreditsModalOpen}
          onClose={() => setBuyCreditsModalOpen(false)}
          project={project}
          imageStorageBaseUrl={imageStorageBaseUrl}
          apiServerUrl={apiServerUrl}
        />
      )}
      {submitted && <Banner text="Thanks for submitting your information!" />}
    </div>
  );
}

export { ProjectDetails };
