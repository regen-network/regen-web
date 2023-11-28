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
import {
  connectWalletModalAtom,
  switchWalletModalAtom,
} from 'lib/atoms/modals.atoms';
import { onBtnClick } from 'lib/button';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';
import { getBatchesTotal } from 'lib/ecocredit/api';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getGeocodingQuery } from 'lib/queries/react-query/mapbox/getGeocodingQuery/getGeocodingQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByIdQuery as getOffChainProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllProjectPageQuery } from 'lib/queries/react-query/sanity/getAllProjectPageQuery/getAllProjectPageQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';
import { getSoldOutProjectsQuery } from 'lib/queries/react-query/sanity/getSoldOutProjectsQuery/getSoldOutProjectsQuery';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';
import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useCreateSellOrderData } from 'features/marketplace/CreateSellOrderFlow/hooks/useCreateSellOrderData';
import { DetailsSection } from 'components/organisms/DetailsSection/DetailsSection';
import { useAllSoldOutProjectsIds } from 'components/organisms/ProjectCardsSection/hooks/useSoldOutProjectsIds';
import { ProjectStorySection } from 'components/organisms/ProjectStorySection/ProjectStorySection';
import { SellOrdersActionsBar } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar';
import { AVG_PRICE_TOOLTIP_PROJECT } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar.constants';
import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';

import { useLedger } from '../../../ledger';
import { client as sanityClient } from '../../../lib/clients/sanity';
import { NotFoundPage } from '../../../pages/NotFound/NotFound';
import { GettingStartedResourcesSection } from '../../molecules';
import { ProjectTopSection } from '../../organisms';
import useGeojson from './hooks/useGeojson';
import useSeo from './hooks/useSeo';
import { useSortedDocuments } from './hooks/useSortedDocuments';
import { useStakeholders } from './hooks/useStakeholders';
import { JURISDICTION_REGEX } from './ProjectDetails.constant';
import { ManagementActions } from './ProjectDetails.ManagementActions';
import { MemoizedMoreProjects as MoreProjects } from './ProjectDetails.MoreProjects';
import { ProjectDetailsStakeholders } from './ProjectDetails.Stakeholders';
import { getMediaBoxStyles } from './ProjectDetails.styles';
import {
  findSanityCreditClass,
  formatOtcCardData,
  getIsOffChainUuid,
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
  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  const { wallet, isConnected } = useWallet();
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
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);

  // first, check if projectId is an off-chain project handle (for legacy projects like "wilmot")
  // or an chain project id
  // or and off-chain project with an UUID
  const isOnChainId = getIsOnChainId(projectId);
  const isOffChainUuid = getIsOffChainUuid(projectId);

  const { data: sanityProjectData } = useQuery(
    getProjectByIdQuery({
      id: projectId as string,
      sanityClient,
      enabled: !!sanityClient && isOnChainId && !!projectId,
    }),
  );

  // if projectId is slug, query project by slug
  const { data: projectBySlug, isInitialLoading: loadingProjectBySlug } =
    useQuery(
      getProjectBySlugQuery({
        client: graphqlClient,
        slug: projectId as string,
        enabled: !!projectId && !isOnChainId && !isOffChainUuid,
      }),
    );

  // else fetch project by onChainId
  const {
    data: projectByOnChainId,
    isInitialLoading: loadingProjectByOnChainId,
  } = useQuery(
    getProjectByOnChainIdQuery({
      client: graphqlClient,
      enabled: !!projectId && !!isOnChainId,
      onChainId: projectId as string,
    }),
  );

  // else fetch project by uuid
  const {
    data: offchainProjectByIdData,
    isInitialLoading: loadingOffchainProjectById,
  } = useQuery(
    getOffChainProjectByIdQuery({
      client: graphqlClient,
      enabled: !!projectId && !!isOffChainUuid,
      id: projectId,
    }),
  );

  const projectBySlugOnChainId =
    projectBySlug?.data.projectBySlug?.onChainId ?? undefined;
  const projectByUuidOnChainId =
    offchainProjectByIdData?.data.projectById?.onChainId ?? undefined;
  const onChainProjectId = isOnChainId
    ? projectId
    : projectBySlugOnChainId ?? projectByUuidOnChainId;

  const { data: projectResponse } = useQuery(
    getProjectQuery({
      request: { projectId: onChainProjectId },
      client: ecocreditClient,
      enabled: !!ecocreditClient && !!onChainProjectId,
    }),
  );

  const onChainProject = projectResponse?.project;
  const jurisdiction = onChainProject?.jurisdiction;
  const countryCodeMatch = jurisdiction?.match(JURISDICTION_REGEX);
  const countryCode = countryCodeMatch?.[3] || countryCodeMatch?.[1];

  const { data: geocodingJurisdictionData } = useQuery(
    getGeocodingQuery({
      request: { search: countryCode },
      enabled: !!countryCode,
    }),
  );

  const offChainProjectById = offchainProjectByIdData?.data.projectById;
  const publishedOffchainProjectById = offChainProjectById?.published
    ? offChainProjectById
    : undefined;

  const offChainProject = isOnChainId
    ? projectByOnChainId?.data.projectByOnChainId
    : publishedOffchainProjectById ?? projectBySlug?.data.projectBySlug;

  /* Credit class */

  const onChainCreditClassId =
    offChainProject?.creditClassByCreditClassId?.onChainId ??
    onChainProjectId?.split('-')?.[0];
  const { data: creditClassOnChain } = useQuery(
    getClassQuery({
      client: ecocreditClient,
      request: {
        classId: onChainCreditClassId ?? '',
      },
      enabled: !!ecocreditClient && !!onChainCreditClassId,
    }),
  );
  const creditClassMetadataRes = useQuery(
    getMetadataQuery({
      iri: creditClassOnChain?.class?.metadata,
      enabled: !!dataClient && !!creditClassOnChain?.class?.metadata,
      dataClient,
    }),
  );
  const creditClassMetadata = creditClassMetadataRes?.data as
    | CreditClassMetadataLD
    | undefined;

  /** Anchored project metadata comes from IRI resolver. */
  const { data, isInitialLoading: loadingAnchoredMetadata } = useQuery(
    getMetadataQuery({
      iri: onChainProject?.metadata,
      dataClient,
      enabled: !!dataClient,
    }),
  );
  const anchoredMetadata = data as AnchoredProjectMetadataLD | undefined;

  const { batchesWithSupply, setPaginationParams, paginationParams } =
    useFetchPaginatedBatches({ projectId: String(onChainProjectId) });
  const { totals: batchesTotal } = getBatchesTotal(batchesWithSupply ?? []);

  const {
    offChainProjectMetadata,
    managementActions,
    projectDocs,
    creditClass,
    creditClassName,
    creditClassVersion,
  } = parseOffChainProject(offChainProject as Maybe<Project>);

  const { sortCallbacksDocuments, sortedDocuments } = useSortedDocuments({
    projectDocs,
  });

  // For legacy/open projects (that are not on-chain), all metadata is stored off-chain
  const projectMetadata = !!onChainProjectId
    ? anchoredMetadata
    : offChainProjectMetadata;

  const { projectDeveloper, projectVerifier, program, admin } = useStakeholders(
    {
      anchoredMetadata,
      offChainProject,
      onChainProject,
      creditClassMetadata,
    },
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

  const mediaData = parseMedia({
    metadata: offChainProjectMetadata,
    geojson,
    geocodingJurisdictionData,
  });

  const loadingDb =
    loadingProjectByOnChainId ||
    loadingProjectBySlug ||
    loadingOffchainProjectById;

  const { isBuyFlowDisabled, projectsWithOrderData } = useBuySellOrderData({
    projectId: onChainProjectId,
  });

  const { credits } = useCreateSellOrderData({
    projectId: projectsWithOrderData[0]?.id,
  });

  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl:
      creditClass?.onChainId ??
      creditClassVersion?.metadata?.['schema:url'] ??
      onChainProjectId?.split('-')?.[0], // if no offChain credit class
  });
  const isCommunityCredit = !creditClassSanity;

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
  const onBookCallButtonClick = () =>
    onBtnClick(() => void 0, sanityProjectPage?.otcCard?.button);
  const otcCard = formatOtcCardData({
    data: sanityProjectPage?.otcCard,
    isConnected,
    orders: projectsWithOrderData[0]?.sellOrders,
    hideOtcCard: isCommunityCredit || !onChainProjectId,
    setIsBuyFlowStarted,
  });

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
        isBuyButtonDisabled={isBuyFlowDisabled && Boolean(wallet?.address)}
        isCommunityCredit={isCommunityCredit}
        onBookCallButtonClick={onBookCallButtonClick}
        onBuyButtonClick={() => {
          if (isBuyFlowDisabled) {
            setConnectWalletModal(atom => void (atom.open = true));
          } else {
            if (isConnected) {
              setIsBuyFlowStarted(true);
            } else {
              setSwitchWalletModalAtom(atom => void (atom.open = true));
            }
          }
        }}
        onChainProjectId={onChainProjectId}
        projectName={anchoredMetadata?.['schema:name']}
        onChainCreditClassId={onChainProject?.classId}
        avgPricePerTonLabel={
          projectsWithOrderData[0]?.purchaseInfo?.sellInfo?.avgPricePerTonLabel
        }
        avgPricePerTonTooltip={AVG_PRICE_TOOLTIP_PROJECT}
      />

      <ProjectTopSection
        offChainProject={offChainProject}
        onChainProject={onChainProject}
        projectMetadata={projectMetadata}
        projectPageMetadata={offChainProjectMetadata}
        creditClassSanity={creditClassSanity}
        geojson={geojson}
        isGISFile={isGISFile}
        onChainProjectId={onChainProjectId}
        loading={loadingDb || loadingAnchoredMetadata}
        soldOutProjectsIds={soldOutProjectsIds}
        projectWithOrderData={projectsWithOrderData[0]}
        batchData={{
          batches: batchesWithSupply,
          totals: batchesTotal,
        }}
        otcCard={otcCard}
        creditClassOnChain={creditClassOnChain}
        creditClassMetadata={creditClassMetadata}
        onChainCreditClassId={onChainCreditClassId}
        program={program}
      />

      {hasProjectPhotos && <Gallery photos={projectPhotos} sx={{ mb: 25 }} />}

      <ProjectStorySection
        projectPageMetadata={offChainProjectMetadata}
        sx={{ pt: { xs: 0 } }}
      />

      <DetailsSection
        header={sanityProjectPage?.projectDetailsSection}
        credibilityCards={sanityProjectData?.allProject?.[0]?.credibilityCards}
        sx={{ pt: { xs: 0 } }}
      >
        <ProjectDetailsStakeholders
          projectDeveloper={projectDeveloper}
          projectVerifier={projectVerifier}
          program={program}
          admin={admin}
        />
      </DetailsSection>

      <ProjectDetailsTableTabs
        sortedDocuments={sortedDocuments}
        sortCallbacksDocuments={sortCallbacksDocuments}
        offChainProject={offChainProject}
        projectMetadata={projectMetadata}
        onChainProjectId={onChainProjectId}
        batchData={{
          batches: batchesWithSupply,
          totals: batchesTotal,
        }}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        sx={{ pt: { xs: 0 } }}
      />

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
        isCommunityCredit={isCommunityCredit}
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
