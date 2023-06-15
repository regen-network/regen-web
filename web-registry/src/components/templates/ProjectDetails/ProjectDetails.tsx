import { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Box, Skeleton, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { useSetAtom } from 'jotai';

import { Gallery } from 'web-components/lib/components/organisms/Gallery/Gallery';
import SEO from 'web-components/lib/components/seo';
import ProjectMedia from 'web-components/lib/components/sliders/ProjectMedia';

import { Project } from 'generated/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { getBatchesTotal } from 'lib/ecocredit/api';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByHandleQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByHandleQuery/getProjectByHandleQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllProjectPageQuery } from 'lib/queries/react-query/sanity/getAllProjectPageQuery/getAllProjectPageQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';
import { getSoldOutProjectsQuery } from 'lib/queries/react-query/sanity/getSoldOutProjectsQuery/getSoldOutProjectsQuery';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';
import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useCreateSellOrderData } from 'features/marketplace/CreateSellOrderFlow/hooks/useCreateSellOrderData';
import { useAllSoldOutProjectsIds } from 'components/organisms/ProjectCardsSection/hooks/useSoldOutProjectsIds';
import { ProjectDetailsSection } from 'components/organisms/ProjectDetailsSection/ProjectDetailsSection';
import { ProjectStorySection } from 'components/organisms/ProjectStorySection/ProjectStorySection';
import { SellOrdersActionsBar } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar';
import { usePaginatedBatchesByProject } from 'hooks/batches/usePaginatedBatchesByProject';

import { useLedger } from '../../../ledger';
import { client as sanityClient } from '../../../lib/clients/sanity';
import { NotFoundPage } from '../../../pages/NotFound/NotFound';
import { GettingStartedResourcesSection } from '../../molecules';
import { ProjectImpactSection, ProjectTopSection } from '../../organisms';
import useGeojson from './hooks/useGeojson';
import useImpact from './hooks/useImpact';
import useSeo from './hooks/useSeo';
import { useSortedDocuments } from './hooks/useSortedDocuments';
import { ManagementActions } from './ProjectDetails.ManagementActions';
import { MemoizedMoreProjects as MoreProjects } from './ProjectDetails.MoreProjects';
import { getMediaBoxStyles } from './ProjectDetails.styles';
import {
  getDisplayParty,
  getIsOnChainId,
  getProjectGalleryPhotos,
  parseMedia,
  parseOffChainProject,
} from './ProjectDetails.utils';
import { ProjectDetailsTableTabs } from './tables/ProjectDetails.TableTabs';

function ProjectDetails(): JSX.Element {
  const theme = useTheme();
  const { projectId } = useParams();
  const { ecocreditClient, dataClient } = useLedger();
  const setConnectWalletModal = useSetAtom(connectWalletModalAtom);
  const { wallet } = useWallet();
  const graphqlClient = useApolloClient();
  const { track } = useTracker();
  const location = useLocation();
  const { isKeplrMobileWeb } = useWallet();

  const { data: sanityProjectPageData } = useQuery(
    getAllProjectPageQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const sanityProjectPage = sanityProjectPageData?.allProjectPage?.[0];
  const gettingStartedResourcesSection =
    sanityProjectPage?.gettingStartedResourcesSection;

  const { data: sanitySoldOutProjects } = useQuery(
    getSoldOutProjectsQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const soldOutProjectsIds = useAllSoldOutProjectsIds({
    sanitySoldOutProjects,
  });

  const { data: sanityCreditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);

  // first, check if projectId is an off-chain project handle (for legacy projects like "wilmot")
  // or an chain project id
  const isOnChainId = getIsOnChainId(projectId);

  const { data: sanityProjectData } = useQuery(
    getProjectByIdQuery({
      id: projectId as string,
      sanityClient,
      enabled: !!sanityClient && isOnChainId && !!projectId,
    }),
  );

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

  const offChainProject = isOnChainId
    ? projectByOnChainId?.data.projectByOnChainId
    : projectByHandle?.data.projectByHandle;

  /** Anchored project metadata comes from IRI resolver. */
  const { data: anchoredMetadata, isInitialLoading: loadingAnchoredMetadata } =
    useQuery(
      getMetadataQuery({
        iri: onChainProject?.metadata,
        dataClient,
        enabled: !!dataClient,
      }),
    );

  const { batchesWithSupply, setPaginationParams, paginationParams } =
    usePaginatedBatchesByProject({ projectId: String(onChainProjectId) });
  const { totals: batchesTotal } = getBatchesTotal(batchesWithSupply ?? []);

  const {
    offChainProjectMetadata,
    managementActions,
    projectDocs,
    creditClassName,
    coBenefitsIris,
    primaryImpactIRI,
  } = parseOffChainProject(offChainProject as Maybe<Project>);

  const { sortCallbacksDocuments, sortedDocuments } = useSortedDocuments({
    projectDocs,
  });

  // For legacy projects (that are not on-chain), all metadata is stored off-chain
  const projectMetadata = isOnChainId
    ? anchoredMetadata
    : offChainProjectMetadata;

  const projectDeveloper = getDisplayParty(
    'regen:projectDeveloper',
    anchoredMetadata,
    offChainProject?.partyByDeveloperId,
  );

  const projectVerifier = getDisplayParty(
    'regen:projectVerifier',
    anchoredMetadata,
    offChainProject?.partyByVerifierId,
  );

  const { geojson, isGISFile } = useGeojson({
    projectMetadata,
    projectPageMetadata: offChainProjectMetadata,
  });

  const seoData = useSeo({
    projectMetadata,
    projectPageMetadata: offChainProjectMetadata,
    projectDeveloper,
    creditClassName,
  });

  const mediaData = parseMedia({ metadata: offChainProjectMetadata, geojson });

  const impactData = useImpact({ coBenefitsIris, primaryImpactIRI });

  const loadingDb = loadingProjectByOnChainId || loadingProjectByHandle;

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

  if (
    !loadingDb &&
    !loadingAnchoredMetadata &&
    !offChainProject &&
    !projectResponse
  )
    return <NotFoundPage />;

  const projectPhotos = getProjectGalleryPhotos({ offChainProjectMetadata });
  const hasProjectPhotos = projectPhotos.length > 0;

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        location={seoData.location}
        siteMetadata={seoData.siteMetadata}
        title={seoData.title}
        imageUrl={seoData.imageUrl}
      />

      {mediaData.assets.length === 0 && loadingDb && (
        <Skeleton sx={getMediaBoxStyles(theme)} />
      )}

      {mediaData.assets.length > 0 && (
        <Box sx={{ pt: { xs: 0, sm: 12.5 } }}>
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
        isSellButtonDisabled={isSellFlowDisabled && Boolean(wallet?.address)}
        isBuyButtonDisabled={isBuyFlowDisabled && Boolean(wallet?.address)}
        onSellButtonClick={() =>
          isSellFlowDisabled
            ? setConnectWalletModal(atom => void (atom.open = true))
            : setIsSellFlowStarted(true)
        }
        onBuyButtonClick={() =>
          isBuyFlowDisabled
            ? setConnectWalletModal(atom => void (atom.open = true))
            : setIsBuyFlowStarted(true)
        }
        onChainProjectId={onChainProjectId}
        projectName={anchoredMetadata?.['schema:name']}
        onChainCreditClassId={onChainProject?.classId}
      />

      <ProjectTopSection
        offChainProject={offChainProject}
        onChainProject={onChainProject}
        projectMetadata={projectMetadata}
        projectPageMetadata={offChainProjectMetadata}
        sanityCreditClassData={sanityCreditClassData}
        geojson={geojson}
        isGISFile={isGISFile}
        onChainProjectId={onChainProjectId}
        projectDeveloper={projectDeveloper}
        projectVerifier={projectVerifier}
        loading={loadingDb || loadingAnchoredMetadata}
        soldOutProjectsIds={soldOutProjectsIds}
        projectWithOrderData={projectsWithOrderData[0]}
        batchData={{
          batches: batchesWithSupply,
          totals: batchesTotal,
        }}
      />

      {hasProjectPhotos && <Gallery photos={projectPhotos} />}

      <ProjectDetailsSection
        header={sanityProjectPage?.projectDetailsSection}
        credibilityCards={sanityProjectData?.allProject?.[0]?.credibilityCards}
      />

      <ProjectStorySection projectPageMetadata={offChainProjectMetadata} />

      {impactData?.length > 0 && (
        <div
          className={cx(
            'topo-background-alternate',
            isKeplrMobileWeb && 'dark',
          )}
        >
          <ProjectImpactSection impact={impactData} />
        </div>
      )}

      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <ProjectDetailsTableTabs
          sortedDocuments={sortedDocuments}
          sortCallbacksDocuments={sortCallbacksDocuments}
          offChainProject={offChainProject}
          batchData={{
            batches: batchesWithSupply,
            totals: batchesTotal,
          }}
          paginationParams={paginationParams}
          setPaginationParams={setPaginationParams}
        />
      </div>

      {managementActions && <ManagementActions actions={managementActions} />}

      <MoreProjects />

      {gettingStartedResourcesSection && (
        <div
          className={cx(
            'topo-background-alternate',
            isKeplrMobileWeb && 'dark',
          )}
        >
          <GettingStartedResourcesSection
            section={gettingStartedResourcesSection}
          />
        </div>
      )}

      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={
          projectsWithOrderData?.length > 0
            ? [projectsWithOrderData[0]]
            : undefined
        }
        track={track}
        location={location}
      />
      <CreateSellOrderFlow
        isFlowStarted={isSellFlowStarted}
        setIsFlowStarted={setIsSellFlowStarted}
        credits={creditsWithProjectName}
      />
    </Box>
  );
}

export { ProjectDetails };
