import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';
import * as togeojson from '@mapbox/togeojson';
import { useLocation, useParams } from 'react-router-dom';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { getFormattedDate } from 'web-components/lib/utils/format';
import IssuanceModal, {
  IssuanceModalData,
} from 'web-components/lib/components/modal/IssuanceModal';
import Timeline from 'web-components/lib/components/timeline';
import ProjectMedia, {
  Asset,
} from 'web-components/lib/components/sliders/ProjectMedia';
import BuyFooter from 'web-components/lib/components/fixed-footer/BuyFooter';
import Modal from 'web-components/lib/components/modal';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import Banner from 'web-components/lib/components/banner';
import SEO from 'web-components/lib/components/seo';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import StaticMap from 'web-components/lib/components/map/StaticMap';
import { CreditPrice } from 'web-components/lib/components/fixed-footer/BuyFooter';

import { setPageView } from '../../lib/ga';
import getApiUri from '../../lib/apiUri';
import { buildIssuanceModalData } from '../../lib/transform';
import { useLedger } from '../../ledger';
import { chainId } from '../../lib/ledger';
import { useWallet } from '../../lib/wallet';
import {
  Documentation,
  ProjectTopSection,
  ProjectImpactSection,
  MoreProjectsSection,
  CreditsPurchaseForm,
  LandManagementActions,
  BuyCreditsModal,
  ProcessingModal,
  ConfirmationModal,
} from '../organisms';
import { Credits } from '../organisms/BuyCreditsModal';
import { DisplayValues } from '../organisms/EntityDisplayForm';
import {
  useMoreProjectsQuery,
  useProjectByHandleQuery,
} from '../../generated/graphql';
import { useEcologicalImpactByIriQuery } from '../../generated/sanity-graphql';
import { client } from '../../sanity';
import { getBatchesWithSupplyForDenoms } from '../../lib/ecocredit';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from '../../types/ledger/ecocredit';
import Section from 'web-components/lib/components/section';

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
  const { api } = useLedger({ forceExp: true });
  const { projectId } = useParams();
  const theme = useTheme<Theme>();
  const walletContext = useWallet();
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [batchData, setBatchData] = useState<BatchInfoWithSupply[]>([]);
  const [batchTotals, setBatchTotals] = useState<BatchTotalsForProject>();
  const [geojson, setGeojson] = useState<any | null>(null);
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;
  let txClient: ServiceClientImpl | undefined;
  if (api) {
    txClient = new ServiceClientImpl(api.queryClient);
  }

  // fetch project
  const { data } = useProjectByHandleQuery({
    skip: !projectId,
    variables: { handle: projectId as string },
  });
  const metadata = data?.projectByHandle?.metadata;

  const vintageBatchDenoms: string[] = (
    data?.projectByHandle?.creditVintagesByProjectId?.nodes || []
  )
    .map(v => v?.batchDenom || '')
    .filter(Boolean);

  useEffect(() => {
    if (vintageBatchDenoms?.length > 0) {
      const fetch = async (): Promise<void> => {
        try {
          const { batches, totals } = await getBatchesWithSupplyForDenoms(
            vintageBatchDenoms,
          );
          setBatchData(batches);
          setBatchTotals(totals);
        } catch (err) {
          console.error(err); // eslint-disable-line no-console
        }
      };
      fetch();
    }
  }, [vintageBatchDenoms.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: projectsData } = useMoreProjectsQuery();

  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setPageView(location);
    setGeojson(null); // reset when location changes
  }, [location]);

  const otherProjects = projectsData?.allProjects?.nodes?.filter(
    p => p?.handle !== projectId,
  );

  // Convert kml to geojson
  const mapFile: string =
    metadata?.['http://regen.network/boundaries']?.['@value'];
  const isGISFile: boolean = /\.(json|kml)$/i.test(mapFile);
  const isKMLFile: boolean = /\.kml$/i.test(mapFile);
  const metadataLocation = metadata?.['http://schema.org/location'];

  useEffect(() => {
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
    } else if (metadataLocation) {
      setGeojson(metadataLocation);
    }
  }, [geojson, isGISFile, isKMLFile, mapFile, metadataLocation]);

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
  const [isBuyCreditsModalOpen, setIsBuyCreditsModalOpen] = useState(false);

  const viewOnLedger = (creditVintage: any): void => {
    if (creditVintage?.txHash) {
      if (creditVintage.txHash !== issuanceModalData?.txHash) {
        const issuanceData = buildIssuanceModalData(data, creditVintage);
        setIssuanceModalData(issuanceData);
      }
      setIssuanceModalOpen(true);
    }
  };

  const handleProcessingModalClose = (): void => {
    if (walletContext?.txResult?.transactionHash) {
      setIsConfirmationModalOpen(true);
    }
    setIsProcessingModalOpen(false);
  };

  const handleConfirmationModalClose = (): void => {
    setIsProcessingModalOpen(false);
    setIsConfirmationModalOpen(false);
    walletContext.setTxResult(undefined);
  };

  const handleTxQueued = (txBytes: Uint8Array): void => {
    setIsProcessingModalOpen(true);
    if (walletContext?.broadcast) {
      walletContext.broadcast(txBytes);
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
  const projectAddress = metadataLocation?.place_name;
  const galleryPhotos =
    metadata?.['http://regen.network/galleryPhotos']?.['@list'];
  const noGallery = !galleryPhotos || galleryPhotos?.length === 0;
  const previewPhoto =
    metadata?.['http://regen.network/previewPhoto']?.['@value'];
  const noGalleryAssets: Asset[] = [];
  if (previewPhoto) {
    noGalleryAssets.push({ src: previewPhoto, type: 'image' });
  }
  if (geojson) {
    noGalleryAssets.push(
      <StaticMap
        geojson={geojson}
        mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />,
    );
  }
  const assets = noGallery
    ? noGalleryAssets
    : galleryPhotos.map((photo: { '@value': string }) => ({
        src: photo['@value'],
        type: 'image',
      }));

  const siteMetadata = {
    title: `Regen Network Registry`,
    description:
      creditClassName && partyName && projectAddress
        ? `Learn about ${creditClassName} credits sourced from ${partyName} in ${projectAddress}.`
        : '',
    author: `Regen Network`,
    siteUrl: `${window.location.origin}`,
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
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        location={location}
        siteMetadata={siteMetadata}
        title={metadata?.['http://schema.org/name']}
        imageUrl={metadata?.['http://schema.org/image']?.['@value']}
      />

      {assets.length > 0 && (
        <ProjectMedia
          assets={assets}
          gridView
          mobileHeight={theme.spacing(78.75)}
          imageStorageBaseUrl={imageStorageBaseUrl}
          apiServerUrl={apiServerUrl}
          imageCredits={metadata?.['http://schema.org/creditText']}
        />
      )}
      <ProjectTopSection
        data={data}
        batchData={{
          batches: batchData,
          totals: batchTotals,
        }}
        geojson={geojson}
        isGISFile={isGISFile}
      />
      {impactData?.allEcologicalImpact &&
        impactData?.allEcologicalImpact.length > 0 && (
          <div className="topo-background-alternate">
            <ProjectImpactSection impact={impactData?.allEcologicalImpact} />
          </div>
        )}

      {data?.projectByHandle?.documentsByProjectId?.nodes &&
        data.projectByHandle.documentsByProjectId.nodes.length > 0 && (
          <div className="topo-background-alternate">
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
          <Box
            className="topo-background-alternate"
            sx={{ pb: { xs: 17, sm: 22.25 } }}
          >
            <Section titleVariant="h2" title="Timeline" titleAlign="left">
              <Box sx={{ mt: { xs: 10, sm: 12 } }}>
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
              </Box>
            </Section>
          </Box>
        )}

      {otherProjects && otherProjects.length > 0 && (
        <div className="topo-background-alternate">
          <MoreProjectsSection projects={otherProjects} />
        </div>
      )}

      {chainId && project.creditPrice ? (
        <BuyFooter
          onClick={() => setIsBuyCreditsModalOpen(true)}
          creditPrice={project.creditPrice}
        />
      ) : (
        <FixedFooter justifyContent="flex-end">
          <>
            <ContainedButton
              size="large"
              onClick={handleOpen}
              startIcon={<EmailIcon />}
            >
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

      {project.creditPrice && project.stripePrice && (
        <Modal open={open} onClose={handleClose}>
          <CreditsPurchaseForm
            onClose={handleClose}
            creditPrice={project.creditPrice}
            stripePrice={project.stripePrice}
          />
        </Modal>
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
        <>
          <BuyCreditsModal
            open={isBuyCreditsModalOpen}
            onClose={() => setIsBuyCreditsModalOpen(false)}
            onTxQueued={txRaw => handleTxQueued(txRaw)}
            project={{
              id: projectId as string,
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
          <ProcessingModal
            open={
              !walletContext?.txResult?.transactionHash && isProcessingModalOpen
            }
            txHash={walletContext?.txResult?.transactionHash}
            onClose={handleProcessingModalClose}
          />
          <ConfirmationModal
            open={
              !!isConfirmationModalOpen ||
              !!walletContext?.txResult?.transactionHash
            }
            onClose={handleConfirmationModalClose}
            data={walletContext.txResult}
          />
        </>
      )}
      {submitted && <Banner text="Thanks for submitting your information!" />}
    </Box>
  );
}

export { ProjectDetails };
