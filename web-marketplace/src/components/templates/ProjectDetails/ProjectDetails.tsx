import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useLingui } from '@lingui/react';
import { Box, Skeleton, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { useSetAtom } from 'jotai';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { PREFINANCE } from 'web-components/src/components/cards/ProjectCard/ProjectCard.constants';
import { PrefinanceIcon } from 'web-components/src/components/icons/PrefinanceIcon';
import { Gallery } from 'web-components/src/components/organisms/Gallery/Gallery';
import SEO from 'web-components/src/components/seo';
import ProjectMedia, {
  Media,
} from 'web-components/src/components/sliders/ProjectMedia';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { Project } from 'generated/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import {
  connectWalletModalAtom,
  switchWalletModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
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
import { SOLD_OUT_TOOLTIP } from 'pages/Projects/AllProjects/AllProjects.constants';
import { getPriceToDisplay } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { Link } from 'components/atoms';
import { DetailsSection } from 'components/organisms/DetailsSection/DetailsSection';
import { PostFlow } from 'components/organisms/PostFlow/PostFlow';
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
import { ProjectDetailsBannerCard } from './ProjectDetails.BannerCard';
import { JURISDICTION_REGEX } from './ProjectDetails.constant';
import { DataStream } from './ProjectDetails.DataStream';
import { ManagementActions } from './ProjectDetails.ManagementActions';
import { MemoizedMoreProjects as MoreProjects } from './ProjectDetails.MoreProjects';
import { ProjectDetailsStakeholders } from './ProjectDetails.Stakeholders';
import { getMediaBoxStyles } from './ProjectDetails.styles';
import {
  findSanityCreditClass,
  formatOtcCardData,
  getIsOnChainId,
  getIsUuid,
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
  const {
    activeWalletAddr,
    isConnected,
    isKeplrMobileWeb,
    wallet,
    loginDisabled,
  } = useWallet();
  const graphqlClient = useApolloClient();
  const { track } = useTracker();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeAccount } = useAuth();
  const { _ } = useLingui();

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

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
  const isOffChainUuid = getIsUuid(projectId);

  const { data: sanityProjectData } = useQuery(
    getProjectByIdQuery({
      id: projectId as string,
      sanityClient,
      enabled: !!sanityClient && !!projectId,
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

  const slug =
    offchainProjectByIdData?.data?.projectById?.slug ||
    projectByOnChainId?.data?.projectByOnChainId?.slug ||
    projectBySlug?.data.projectBySlug?.slug;

  useEffect(() => {
    if (!!slug) {
      const hash = location.hash || '';
      navigate(`/project/${slug}${hash}`, { replace: true });
    }
  }, [slug, navigate, location.hash]);

  const element = document.getElementById(location.hash.substring(1));
  useEffect(() => {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [element]);

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
      request: { query: countryCode },
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

  const { projectDeveloper, projectVerifier, program, admin, partners } =
    useStakeholders({
      anchoredMetadata,
      offChainProject,
      onChainProject,
      creditClassMetadata,
    });
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
    onChainProjectMetadata: projectMetadata,
    offChainProjectMetadata,
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

  const isSoldOut = useMemo(
    () =>
      (offChainProject?.id &&
        soldOutProjectsIds.includes(offChainProject?.id)) ||
      (onChainProject?.id && soldOutProjectsIds.includes(onChainProject?.id)) ||
      (offChainProject?.slug &&
        soldOutProjectsIds.includes(offChainProject?.slug)),
    [
      offChainProject?.id,
      offChainProject?.slug,
      onChainProject?.id,
      soldOutProjectsIds,
    ],
  );

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

  const sanityProject = sanityProjectData?.allProject?.[0];
  const projectPrefinancing = sanityProject?.projectPrefinancing;
  const isPrefinanceProject = projectPrefinancing?.isPrefinanceProject;

  const isAdmin =
    (!!activeAccount?.addr && onChainProject?.admin === activeAccount?.addr) ||
    (!!activeAccount?.id &&
      offChainProject?.adminAccountId === activeAccount?.id) ||
    !!(wallet?.address && wallet?.address === onChainProject?.admin) ||
    !!(wallet?.address && wallet?.address === activeAccount?.addr);

  const isProjectPublished = onChainProjectId
    ? !!onChainProjectId
    : offchainProjectByIdData?.data?.projectById?.published ||
      projectBySlug?.data.projectBySlug?.published;

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        location={seoData.location}
        siteMetadata={seoData.siteMetadata}
        title={seoData.title}
        imageUrl={seoData.imageUrl}
      />

      <ProjectDetailsBannerCard
        offChainProject={offChainProject}
        onChainProject={onChainProject}
        content={sanityProjectPage?.bannerCard}
        slug={slug}
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
            isPrefinanceProject={isPrefinanceProject}
          />
        </Box>
      )}

      {(onChainProjectId ||
        isPrefinanceProject ||
        (isAdmin && !loginDisabled)) && (
        <SellOrdersActionsBar
          isBuyButtonDisabled={isBuyFlowDisabled}
          isCommunityCredit={isCommunityCredit}
          onBookCallButtonClick={onBookCallButtonClick}
          isAdmin={isAdmin}
          onBuyButtonClick={() => {
            if (!activeWalletAddr) {
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
          offChainProjectId={offChainProject?.id}
          projectName={anchoredMetadata?.['schema:name']}
          onChainCreditClassId={onChainProject?.classId}
          avgPricePerTonLabel={
            projectsWithOrderData[0]?.purchaseInfo?.sellInfo
              ?.avgPricePerTonLabel
          }
          avgPricePerTonTooltip={AVG_PRICE_TOOLTIP_PROJECT}
          prefinancePrice={
            projectPrefinancing?.price
              ? getPriceToDisplay({
                  price: projectPrefinancing?.price,
                })
              : undefined
          }
          isPrefinanceProject={isPrefinanceProject}
          isSoldOut={isSoldOut}
          onClickCreatePost={() => {
            setIsCreatePostModalOpen(onChainProjectId || offChainProject?.id);
          }}
          isCreatePostButtonDisabled={
            !projectMetadata?.['schema:location'] || !isProjectPublished
          }
        >
          {!isAdmin &&
            isPrefinanceProject &&
            projectPrefinancing?.stripePaymentLink && (
              <InfoTooltip
                title={isSoldOut ? _(SOLD_OUT_TOOLTIP) : ''}
                arrow
                placement="top"
              >
                <span>
                  <ContainedButton
                    className="bg-purple-gradient"
                    startIcon={<PrefinanceIcon width="24" height="24" />}
                    sx={{ height: '100%' }}
                    disabled={isSoldOut}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={
                      isSoldOut ? '' : projectPrefinancing?.stripePaymentLink
                    }
                  >
                    {PREFINANCE}
                  </ContainedButton>
                </span>
              </InfoTooltip>
            )}
        </SellOrdersActionsBar>
      )}

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
        creditClassMetadata={
          creditClassMetadata ||
          offChainProject?.creditClassByCreditClassId?.creditClassVersionsById
            ?.nodes?.[0]?.metadata
        }
        onChainCreditClassId={onChainCreditClassId}
        program={program}
        projectPrefinancing={projectPrefinancing}
        isSoldOut={isSoldOut}
      />

      {hasProjectPhotos && (
        <Gallery items={projectPhotos} sx={{ mb: 25 }} allImages />
      )}

      <ProjectStorySection
        projectPageMetadata={offChainProjectMetadata}
        sx={{ pt: { xs: 0 } }}
      />

      <DetailsSection
        header={sanityProjectPage?.projectDetailsSection}
        credibilityCards={sanityProject?.credibilityCards}
        sx={{ pt: { xs: 0 } }}
      >
        <ProjectDetailsStakeholders
          projectDeveloper={projectDeveloper}
          projectVerifier={projectVerifier}
          program={program}
          admin={admin}
          partners={partners}
        />
      </DetailsSection>

      <DataStream
        adminAddr={offChainProject?.accountByAdminAccountId?.addr}
        adminAccountId={offChainProject?.adminAccountId}
        offChainProjectId={offChainProject?.id}
        adminDescription={sanityProjectPage?.dataStreamAdminDescriptionRaw}
        projectLocation={projectMetadata?.['schema:location']}
        onClickCreatePost={() => {
          setIsCreatePostModalOpen(onChainProjectId || offChainProject?.id);
        }}
      />

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

      {isCreatePostModalOpen && projectMetadata?.['schema:location'] && (
        <PostFlow
          onModalClose={() => {
            setIsCreatePostModalOpen(false);
          }}
          projectLocation={projectMetadata?.['schema:location']}
          projectId={onChainProjectId || offChainProject?.id}
          offChainProjectId={offChainProject?.id}
          projectName={projectMetadata?.['schema:name']}
          projectSlug={slug}
        />
      )}
    </Box>
  );
}

export { ProjectDetails };
