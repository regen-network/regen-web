import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Skeleton, useTheme } from '@mui/material';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { useQuery } from '@tanstack/react-query';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import IssuanceModal from 'web-components/lib/components/modal/IssuanceModal';
import SEO from 'web-components/lib/components/seo';
import ProjectMedia from 'web-components/lib/components/sliders/ProjectMedia';

import { graphqlClient } from 'lib/clients/graphqlClient';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getBatchesTotal } from 'lib/ecocredit/api';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByHandleQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByHandleQuery/getProjectByHandleQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllProjectPageQuery } from 'lib/queries/react-query/sanity/getAllProjectPageQuery/getAllProjectPageQuery';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';
import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useCreateSellOrderData } from 'features/marketplace/CreateSellOrderFlow/hooks/useCreateSellOrderData';
import { useResetErrorBanner } from 'pages/Marketplace/Storefront/hooks/useResetErrorBanner';
import { SellOrdersActionsBar } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar';
import { usePaginatedBatchesByProject } from 'hooks/batches/usePaginatedBatchesByProject';

import { useLedger } from '../../../ledger';
import { client as sanityClient } from '../../../lib/clients/sanity';
import { NotFoundPage } from '../../../pages/NotFound/NotFound';
import { GettingStartedResourcesSection } from '../../molecules';
import { ProjectImpactSection, ProjectTopSection } from '../../organisms';
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
import { getIsOnChainId } from './ProjectDetails.utils';

function ProjectDetails(): JSX.Element {
  const theme = useTheme();
  const { projectId } = useParams();
  const { wallet, ecocreditClient } = useLedger();

  const { data: sanityProjectPageData } = useQuery(
    getAllProjectPageQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const gettingStartedResourcesSection =
    sanityProjectPageData?.allProjectPage?.[0]?.gettingStartedResourcesSection;

  const { data: sanityCreditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const [displayErrorBanner, setDisplayErrorBanner] = useState(false);

  useResetErrorBanner({ displayErrorBanner, setDisplayErrorBanner });

  // Tx client
  const { api } = useLedger();
  let txClient: ServiceClientImpl | undefined;
  if (api) {
    txClient = new ServiceClientImpl(api.queryClient);
  }

  // first, check if projectId is handle or onChainId
  const isOnChainId = getIsOnChainId(projectId);

  // if projectId is handle, query project by handle
  const { data: projectByHandle, isInitialLoading: loadingProjectByHandle } =
    useQuery(
      getProjectByHandleQuery({
        client: graphqlClient,
        enabled: !!projectId && !isOnChainId,
        handle: projectId as string,
      }),
    );

  const projectByHandleOnChainId =
    projectByHandle?.data.projectByHandle?.onChainId ?? undefined;
  const onChainProjectId = isOnChainId ? projectId : projectByHandleOnChainId;
  // else fetch project by onChainId
  const {
    data: projectByOnChainId,
    isInitialLoading: loadingProjectByOnChainId,
  } = useQuery(
    getProjectByOnChainIdQuery({
      client: graphqlClient,
      enabled: !!onChainProjectId,
      onChainId: onChainProjectId as string,
    }),
  );

  const { data: projectResponse } = useQuery(
    getProjectQuery({
      request: { projectId },
      client: ecocreditClient,
      enabled: !!ecocreditClient && !!projectId,
    }),
  );

  const onChainProject = projectResponse?.project;

  // TODO: when all projects are on-chain, just use dataByOnChainId, (or leave out postgres altogether)
  const data = isOnChainId
    ? { ...projectByOnChainId?.data, admin: onChainProject?.admin }
    : projectByHandle?.data;
  const project = isOnChainId
    ? projectByOnChainId?.data.projectByOnChainId
    : projectByHandle?.data.projectByHandle;

  // Legacy projects use project.metadata. On-chain projects use IRI resolver.
  const projectTableMetadata: ProjectMetadataLD = project?.metadata;
  const iriResolvedMetadata = useQuery(
    getMetadataQuery({ iri: onChainProject?.metadata }),
  );
  const metadata = iriResolvedMetadata.data ?? projectTableMetadata;

  const managementActions =
    metadata?.['regen:landManagementActions']?.['@list'];

  const { batchesWithSupply, setPaginationParams, paginationParams } =
    usePaginatedBatchesByProject({ projectId: String(onChainProjectId) });
  const { totals: batchesTotal } = getBatchesTotal(batchesWithSupply ?? []);

  // with project query
  const projectEvents = project?.eventsByProjectId?.nodes;
  const projectDocs = project?.documentsByProjectId?.nodes;

  const creditClassVersion =
    project?.creditClassByCreditClassId?.creditClassVersionsById?.nodes?.[0];

  const creditClassName = creditClassVersion?.name;
  const coBenefitsIris =
    creditClassVersion?.metadata?.['http://regen.network/coBenefits']?.[
      '@list'
    ]?.map((impact: { '@id': string }) => impact['@id']) || [];
  const primaryImpactIRI = [
    creditClassVersion?.metadata?.['http://regen.network/indicator']?.['@id'],
  ];

  const { geojson, isGISFile } = useGeojson(metadata);

  const seoData = useSeo({
    metadata,
    creditClassName,
  });
  const mediaData = useMedia({ metadata, geojson });
  const impactData = useImpact({ coBenefitsIris, primaryImpactIRI });

  const isLoading = loadingProjectByOnChainId || loadingProjectByHandle;

  const {
    issuanceModalData,
    issuanceModalOpen,
    setIssuanceModalOpen,
    viewOnLedger,
  } = useIssuanceModal(data);

  const { isBuyFlowDisabled, projectsWithOrderData } = useBuySellOrderData({
    projectId: onChainProjectId,
  });

  const { credits, isSellFlowDisabled } = useCreateSellOrderData({
    projectId: projectsWithOrderData[0]?.id,
  });

  const creditsWithProjectName = useMemo(() => {
    if (!credits || credits.length === 0 || !projectsWithOrderData[0]) return;
    return credits.map(batch => ({
      ...batch,
      projectName: projectsWithOrderData[0]?.name,
    }));
  }, [credits, projectsWithOrderData]);

  if (!isLoading && !project && !projectResponse) return <NotFoundPage />;
  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        location={seoData.location}
        siteMetadata={seoData.siteMetadata}
        title={seoData.title}
        imageUrl={seoData.imageUrl}
      />

      {mediaData.assets.length === 0 && isLoading && (
        <Skeleton sx={getMediaBoxStyles(theme)} />
      )}

      {mediaData.assets.length > 0 && (
        <ProjectMedia
          gridView
          assets={mediaData.assets}
          apiServerUrl={mediaData.apiServerUrl}
          imageStorageBaseUrl={mediaData.imageStorageBaseUrl}
          imageCredits={mediaData.imageCredits}
          mobileHeight={theme.spacing(78.75)}
        />
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
        onChainProjectId={onChainProjectId}
        projectName={metadata?.['schema:name']}
        onChainCreditClassId={onChainProject?.classId}
      />

      <ProjectTopSection
        data={data}
        onChainProject={onChainProject}
        metadata={metadata}
        sanityCreditClassData={sanityCreditClassData}
        batchData={{
          batches: batchesWithSupply,
          totals: batchesTotal,
        }}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        geojson={geojson}
        isGISFile={isGISFile}
        onChainProjectId={onChainProjectId}
        loading={isLoading}
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

      {gettingStartedResourcesSection && (
        <div className="topo-background-alternate">
          <GettingStartedResourcesSection
            section={gettingStartedResourcesSection}
          />
        </div>
      )}

      {issuanceModalData && (
        <IssuanceModal
          txClient={txClient}
          open={issuanceModalOpen}
          onClose={() => setIssuanceModalOpen(false)}
          {...issuanceModalData}
        />
      )}

      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={
          projectsWithOrderData?.length > 0
            ? [projectsWithOrderData[0]]
            : undefined
        }
      />
      <CreateSellOrderFlow
        isFlowStarted={isSellFlowStarted}
        setIsFlowStarted={setIsSellFlowStarted}
        credits={creditsWithProjectName}
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
