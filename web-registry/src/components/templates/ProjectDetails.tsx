import React, { useState, useEffect } from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import * as togeojson from '@mapbox/togeojson';
import { useLocation, useParams } from 'react-router-dom';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import clsx from 'clsx';

import { getFormattedDate } from 'web-components/lib/utils/format';
import IssuanceModal, {
  IssuanceModalData,
} from 'web-components/lib/components/modal/IssuanceModal';
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
import { CreditPrice } from 'web-components/lib/components/fixed-footer/BuyFooter';

import { setPageView } from '../../lib/ga';
import getApiUri from '../../lib/apiUri';
import { buildIssuanceModalData } from '../../lib/transform';
import { useLedger, ContextType } from '../../ledger';
import { chainId } from '../../wallet';
import {
  Documentation,
  ProjectTopSection,
  ProjectImpactSection,
  MoreProjectsSection,
  CreditsPurchaseForm,
  LandManagementActions,
  BuyCreditsModal,
} from '../organisms';
import { Credits } from '../organisms/BuyCreditsModal';
import { DisplayValues } from '../organisms/EntityDisplayForm';
import {
  useMoreProjectsQuery,
  useProjectByHandleQuery,
} from '../../generated/graphql';
import { useEcologicalImpactByIriQuery } from '../../generated/sanity-graphql';
import { client } from '../../sanity';

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
      padding: `${theme.spacing(3.5)} ${theme.spacing(2.5)} ${theme.spacing(
        2.5,
      )}`,
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

interface Project {
  creditPrice?: CreditPrice;
  stripePrice?: string;
  credits?: Credits;
}

// Update for testing purchase credits modal
const project: Project = {};

function getVisiblePartyName(party?: DisplayValues): string | undefined {
  return party?.['http://regen.network/showOnProjectPage']
    ? party?.['http://schema.org/name']
    : undefined;
}

function ProjectDetails(): JSX.Element {
  const { api }: ContextType = useLedger();
  const { projectId } = useParams<{ projectId: string }>();
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;
  let txClient: ServiceClientImpl | undefined;
  if (api) {
    txClient = new ServiceClientImpl(api.connection.queryConnection);
  }

  const { data } = useProjectByHandleQuery({
    variables: { handle: projectId },
  });
  const metadata = data?.projectByHandle?.metadata;
  const { data: projectsData } = useMoreProjectsQuery();

  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setPageView(location);
  }, [location]);

  const styles = useStyles();
  const theme = useTheme();

  const otherProjects = projectsData?.allProjects?.nodes?.filter(
    p => p?.handle !== projectId,
  );

  const [geojson, setGeojson] = useState<any | null>(null);

  // Convert kml to geojson
  const mapFile: string =
    metadata?.['http://regen.network/boundaries']?.['@value'];
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

  const [issuanceModalData, setIssuanceModalData] =
    useState<IssuanceModalData | null>(null);
  const [issuanceModalOpen, setIssuanceModalOpen] = useState(false);
  const [isBuyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false);

  const viewOnLedger = (creditVintage: any): void => {
    if (creditVintage?.txHash) {
      if (creditVintage.txHash !== issuanceModalData?.txHash) {
        const issuanceData = buildIssuanceModalData(data, creditVintage);
        setIssuanceModalData(issuanceData);
      }
      setIssuanceModalOpen(true);
    }
  };

  const creditClassVersion =
    data?.projectByHandle?.creditClassByCreditClassId?.creditClassVersionsById
      ?.nodes?.[0];
  const creditClassName = creditClassVersion?.name;
  const partyName =
    getVisiblePartyName(metadata?.['http://regen.network/landSteward']) ||
    getVisiblePartyName(metadata?.['http://regen.network/projectDeveloper']) ||
    getVisiblePartyName(metadata?.['http://regen.network/landOwner']) ||
    getVisiblePartyName(metadata?.['http://regen.network/projectOriginator']);
  const projectAddress = metadata?.['http://schema.org/location']?.place_name;
  const siteMetadata = {
    title: `Regen Network Registry`,
    description:
      creditClassName && partyName && projectAddress
        ? `Learn about ${creditClassName} credits sourced from ${partyName} in ${projectAddress}.`
        : '',
    author: `Regen Network`,
    siteUrl: `${window.location.origin}/registry`,
  };

  const coBenefitsIris =
    creditClassVersion?.metadata?.['http://regen.network/coBenefits']?.[
      '@list'
    ]?.map((impact: { '@id': string }) => impact['@id']) || [];
  const impactIris = [
    creditClassVersion?.metadata?.['http://regen.network/indicator']?.['@id'],
    ...coBenefitsIris,
  ];
  const { data: impactData } = useEcologicalImpactByIriQuery({
    client,
    variables: {
      iris: impactIris,
    },
    skip: !impactIris,
  });

  return (
    <div className={styles.root}>
      <SEO
        location={location}
        siteMetadata={siteMetadata}
        title={metadata?.['http://schema.org/name']}
        imageUrl={metadata?.['http://schema.org/image']?.['@value']}
      />

      <ProjectMedia
        assets={
          metadata?.['http://regen.network/galleryPhotos']?.['@list']?.map(
            (photo: { '@value': string }) => ({
              src: photo['@value'],
              type: 'image',
            }),
          ) || []
        }
        gridView
        mobileHeight={theme.spacing(78.75)}
        imageStorageBaseUrl={imageStorageBaseUrl}
        apiServerUrl={apiServerUrl}
        imageCredits={metadata?.['http://schema.org/creditText']}
      />
      <ProjectTopSection data={data} geojson={geojson} isGISFile={isGISFile} />
      <div className="topo-background-alternate">
        <ProjectImpactSection data={impactData} />
      </div>

      {data?.projectByHandle?.documentsByProjectId?.nodes &&
        data.projectByHandle.documentsByProjectId.nodes.length > 0 && (
          <div
            className={clsx('topo-background-alternate', styles.projectContent)}
          >
            <Documentation
              txClient={txClient}
              onViewOnLedger={viewOnLedger}
              documents={data?.projectByHandle?.documentsByProjectId?.nodes.map(
                doc => ({
                  name: doc?.name || '',
                  type: doc?.type || '',
                  date: doc?.date || '',
                  url: doc?.url || '',
                  ledger: '',
                  eventByEventId: doc?.eventByEventId,
                }),
              )}
            />
          </div>
        )}

      {metadata?.['http://regen.network/landManagementActions']?.['@list'] && (
        <div className="topo-background-alternate">
          <LandManagementActions
            actions={metadata?.['http://regen.network/landManagementActions']?.[
              '@list'
            ]?.map((action: any) => ({
              name: action['http://schema.org/name'],
              description: action['http://schema.org/description'],
              imgSrc: action['http://schema.org/image']?.['@value'],
            }))}
            title="Land Management Actions"
            subtitle="This is how the project developers are planning to achieve the primary impact."
          />
        </div>
      )}

      {data?.projectByHandle?.eventsByProjectId?.nodes &&
        data.projectByHandle.eventsByProjectId.nodes.length > 0 && (
          <div
            className={clsx(
              'topo-background-alternate',
              styles.projectDetails,
              styles.projectTimeline,
              styles.projectContent,
            )}
          >
            <Title className={styles.timelineTitle} variant="h2">
              Timeline
            </Title>
            <Timeline
              txClient={txClient}
              onViewOnLedger={viewOnLedger}
              events={data.projectByHandle.eventsByProjectId.nodes.map(
                node => ({
                  date: getFormattedDate(node?.date, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
                  summary: node?.summary || '',
                  description: node?.description || '',
                  creditVintage: node?.creditVintageByEventId,
                }),
              )}
            />
          </div>
        )}

      {otherProjects && otherProjects.length > 0 && (
        <div className="topo-background-alternate">
          <MoreProjectsSection projects={otherProjects} />
        </div>
      )}

      {chainId && project.creditPrice && (
        <BuyFooter
          onClick={() => setBuyCreditsModalOpen(true)}
          creditPrice={project.creditPrice}
        />
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
        <FixedFooter justifyContent="flex-end">
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
      {data && creditClassVersion && chainId && project.creditPrice && (
        <BuyCreditsModal
          open={isBuyCreditsModalOpen}
          onClose={() => setBuyCreditsModalOpen(false)}
          project={{
            id: projectId,
            name: data.projectByHandle?.metadata?.['http://schema.org/name'],
            image:
              data.projectByHandle?.metadata?.[
                'http://regen.network/previewPhoto'
              ],
            creditDenom:
              creditClassVersion.metadata?.[
                'http://regen.network/creditDenom'
              ] || creditClassName,
            credits: project.credits,
          }}
          imageStorageBaseUrl={imageStorageBaseUrl}
          apiServerUrl={apiServerUrl}
        />
      )}
      {submitted && <Banner text="Thanks for submitting your information!" />}
    </div>
  );
}

export { ProjectDetails };
