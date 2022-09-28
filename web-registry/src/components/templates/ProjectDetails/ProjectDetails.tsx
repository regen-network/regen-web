import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Skeleton } from '@mui/material';
import { useTheme } from '@mui/styles';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { QueryProjectResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { CreditPrice } from 'web-components/lib/components/fixed-footer/BuyFooter';
import IssuanceModal from 'web-components/lib/components/modal/IssuanceModal';
import SEO from 'web-components/lib/components/seo';
import ProjectMedia from 'web-components/lib/components/sliders/ProjectMedia';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { getBatchesTotal } from 'lib/ecocredit/api';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';
import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useCreateSellOrderData } from 'features/marketplace/CreateSellOrderFlow/hooks/useCreateSellOrderData';
import { useResetErrorBanner } from 'pages/Marketplace/Storefront/hooks/useResetErrorBanner';
import { SellOrdersActionsBar } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar';
import { usePaginatedBatchesByProject } from 'hooks/batches/usePaginatedBatchesByProject';

import {
  useProjectByHandleQuery,
  useProjectByOnChainIdQuery,
} from '../../../generated/graphql';
import { ProjectMetadataLD } from '../../../generated/json-ld/index';
import useEcocreditQuery from '../../../hooks/useEcocreditQuery';
import useQueryMetadataGraph from '../../../hooks/useQueryMetadataGraph';
import { useLedger } from '../../../ledger';
import { chainId } from '../../../lib/ledger';
import { NotFoundPage } from '../../../pages/NotFound/NotFound';
import { client as sanityClient } from '../../../sanity';
import { ProjectImpactSection, ProjectTopSection } from '../../organisms';
import { Credits } from '../../organisms/BuyCreditsModal/BuyCreditsModal';
import useGeojson from './hooks/useGeojson';
import useImpact from './hooks/useImpact';
import useIssuanceModal from './hooks/useIssuanceModal';
import useMedia from './hooks/useMedia';
import useSeo from './hooks/useSeo';
import { ManagementActions } from './ProjectDetails.ManagementActions';
import { MemoizedMoreProjects as MoreProjects } from './ProjectDetails.MoreProjects';
import { ProjectDocumentation } from './ProjectDetails.ProjectDocumentation';
import { ProjectTimeline } from './ProjectDetails.ProjectTimeline';
import { getMediaBoxStyles } from './ProjectDetails.styles';
import { TransactionModals } from './ProjectDetails.TransactionModals';

interface Project {
  creditPrice?: CreditPrice;
  stripePrice?: string;
  credits?: Credits;
}

// Update for testing purchase credits modal
const testProject: Project = {};

function ProjectDetails(): JSX.Element {
  const theme = useTheme<Theme>();
  const { projectId } = useParams();
  const { wallet } = useLedger();
  const { data: sanityCreditClassData } = useAllCreditClassQuery({
    client: sanityClient,
  });
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const [displayErrorBanner, setDisplayErrorBanner] = useState(false);

  useResetErrorBanner({ displayErrorBanner, setDisplayErrorBanner });

  // Page mode (info/Tx)
  const isTxMode =
    chainId && (testProject.creditPrice || testProject.stripePrice);

  // Tx client
  const { api } = useLedger({ forceExp: true });
  let txClient: ServiceClientImpl | undefined;
  if (api) {
    txClient = new ServiceClientImpl(api.queryClient);
  }

  // first, check if projectId is handle or onChainId
  const isOnChainId =
    !!projectId && /([A-Z]{1}[\d]+)([-])([\d{3,}])\w+/.test(projectId);

  // if projectId is handle, query project by handle
  const { data: dataByHandle, loading: loadingDataByHandle } =
    useProjectByHandleQuery({
      skip: !projectId,
      variables: { handle: projectId as string },
    });

  const onChainProjectId = isOnChainId
    ? projectId
    : dataByHandle?.projectByHandle?.onChainId;

  // else fetch project by onChainId
  const { data: dataByOnChainId, loading } = useProjectByOnChainIdQuery({
    skip: !isOnChainId,
    variables: { onChainId: onChainProjectId as string },
  });

  const { data: projectResponse } = useEcocreditQuery<QueryProjectResponse>({
    query: 'project',
    params: { projectId },
  });
  const onChainProject = projectResponse?.project;

  // TODO: when all projects are on-chain, just use dataByOnChainId
  const data = isOnChainId
    ? { ...dataByOnChainId, admin: onChainProject?.admin }
    : dataByHandle;
  const project = isOnChainId
    ? dataByOnChainId?.projectByOnChainId
    : dataByHandle?.projectByHandle;

  const offChainProjectMetadata: ProjectMetadataLD = project?.metadata;
  const onChainProjectMetadata = useQueryMetadataGraph(
    onChainProject?.metadata,
  );
  const managementActions =
    offChainProjectMetadata?.['regen:landManagementActions']?.['@list'];

  const { batchesWithSupply, setPaginationParams } =
    usePaginatedBatchesByProject({ projectId: String(onChainProjectId) });
  const { totals: batchesTotal } = getBatchesTotal(batchesWithSupply ?? []);

  // with project query
  const projectEvents = project?.eventsByProjectId?.nodes;
  const projectDocs = project?.documentsByProjectId?.nodes;

  const creditClassVersion =
    project?.creditClassByCreditClassId?.creditClassVersionsById?.nodes?.[0];

  const creditClassName = creditClassVersion?.name;
  const creditClassDenom =
    creditClassVersion?.metadata?.['http://regen.network/creditDenom'];
  const coBenefitsIris =
    creditClassVersion?.metadata?.['http://regen.network/coBenefits']?.[
      '@list'
    ]?.map((impact: { '@id': string }) => impact['@id']) || [];
  const primaryImpactIRI = [
    creditClassVersion?.metadata?.['http://regen.network/indicator']?.['@id'],
  ];

  const { geojson, isGISFile } = useGeojson(offChainProjectMetadata);

  const seoData = useSeo({
    metadata: offChainProjectMetadata,
    creditClassName,
  });
  const mediaData = useMedia({ metadata: offChainProjectMetadata, geojson });
  const impactData = useImpact({ coBenefitsIris, primaryImpactIRI });
  const isLoading = loading || loadingDataByHandle;

  const {
    issuanceModalData,
    issuanceModalOpen,
    setIssuanceModalOpen,
    viewOnLedger,
  } = useIssuanceModal(data);

  const projects = useMemo(
    () => (onChainProject ? [onChainProject] : undefined),
    [onChainProject],
  );

  const { isBuyFlowDisabled, projectsWithOrderData } = useBuySellOrderData({
    projects,
  });

  const { credits, isSellFlowDisabled } = useCreateSellOrderData({
    projectId: projectsWithOrderData[0]?.id,
  });

  if (!isLoading && !project) return <NotFoundPage />;
  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        location={seoData.location}
        siteMetadata={seoData.siteMetadata}
        title={seoData.title}
        imageUrl={seoData.imageUrl}
      />

      {mediaData.assets.length === 0 && isLoading && (
        <Box sx={getMediaBoxStyles(theme)}>
          <Skeleton height={theme.spacing(78.75)} />
        </Box>
      )}

      {mediaData.assets.length > 0 && (
        <Box sx={getMediaBoxStyles(theme)}>
          <ProjectMedia
            gridView
            assets={mediaData.assets}
            apiServerUrl={mediaData.apiServerUrl}
            imageStorageBaseUrl={mediaData.imageStorageBaseUrl}
            imageCredits={mediaData.imageCredits}
            mobileHeight={theme.spacing(78.75)}
          />
        </Box>
      )}

      <SellOrdersActionsBar
        isSellButtonDisabled={isSellFlowDisabled}
        isBuyButtonDisabled={isBuyFlowDisabled}
        onSellButtonClick={
          wallet?.address
            ? () => setIsSellFlowStarted(true)
            : () => setDisplayErrorBanner(true)
        }
        onBuyButtonClick={
          wallet?.address
            ? () => setIsBuyFlowStarted(true)
            : () => setDisplayErrorBanner(true)
        }
      />

      <ProjectTopSection
        data={data}
        sanityCreditClassData={sanityCreditClassData}
        batchData={{
          batches: batchesWithSupply,
          totals: batchesTotal,
        }}
        setPaginationParams={setPaginationParams}
        geojson={geojson}
        isGISFile={isGISFile}
      />

      {impactData?.length > 0 && (
        <div className="topo-background-alternate">
          <ProjectImpactSection impact={impactData} />
        </div>
      )}

      {projectDocs && projectDocs.length > 0 && (
        <ProjectDocumentation
          docs={projectDocs}
          txClient={txClient}
          viewOnLedger={viewOnLedger}
        />
      )}

      {managementActions && <ManagementActions actions={managementActions} />}

      {projectEvents && projectEvents?.length > 0 && (
        <ProjectTimeline
          events={projectEvents}
          txClient={txClient}
          viewOnLedger={viewOnLedger}
        />
      )}

      <MoreProjects />

      {issuanceModalData && (
        <IssuanceModal
          txClient={txClient}
          open={issuanceModalOpen}
          onClose={() => setIssuanceModalOpen(false)}
          {...issuanceModalData}
        />
      )}

      {isTxMode && (
        <TransactionModals
          metadata={onChainProjectMetadata}
          projectId={projectId}
          testProject={testProject}
          creditDenom={creditClassDenom || creditClassName}
        />
      )}

      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        selectedProject={projectsWithOrderData[0]}
      />
      <CreateSellOrderFlow
        isFlowStarted={isSellFlowStarted}
        setIsFlowStarted={setIsSellFlowStarted}
        credits={credits}
      />
      {displayErrorBanner && (
        <ErrorBanner
          text="Please install Keplr extension to use Regen Ledger features"
          onClose={() => setDisplayErrorBanner(false)}
        />
      )}
    </Box>
  );
}

export { ProjectDetails };
