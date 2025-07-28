'use client';

import { useCallback, useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';
import { Box, CircularProgress, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { useAtom, useSetAtom } from 'jotai';
import { buyFromProjectIdAtom } from 'legacy-pages/BuyCredits/BuyCredits.atoms';
import { CREATE_POST_DISABLED_TOOLTIP_TEXT } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';
import { SOLD_OUT_TOOLTIP } from 'legacy-pages/Projects/AllProjects/AllProjects.constants';
import { getPriceToDisplay } from 'legacy-pages/Projects/hooks/useProjectsSellOrders.utils';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { PrefinanceIcon } from 'web-components/src/components/icons/PrefinanceIcon';
import { Gallery } from 'web-components/src/components/organisms/Gallery/Gallery';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { Project } from 'generated/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { onBtnClick } from 'lib/button';
import {
  getProjectCardBodyTextMapping,
  PHOTO_CREDIT,
} from 'lib/constants/shared.constants';
import { CreditClassMetadataLD, ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getBatchesTotal } from 'lib/ecocredit/api';
import { IS_REGEN, IS_TERRASOS } from 'lib/env';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllProjectPageQuery } from 'lib/queries/react-query/sanity/getAllProjectPageQuery/getAllProjectPageQuery';
import { getSoldOutProjectsQuery } from 'lib/queries/react-query/sanity/getSoldOutProjectsQuery/getSoldOutProjectsQuery';
import { getTerrasosBookCallQuery } from 'lib/queries/react-query/sanity/getTerrasosBookCallQuery/getTerrasosBookCallQuery';
import { useWallet } from 'lib/wallet/wallet';

import { DetailsSection } from 'components/organisms/DetailsSection/DetailsSection';
import { PostFormSchemaType } from 'components/organisms/PostForm/PostForm.schema';
import { useAllSoldOutProjectsIds } from 'components/organisms/ProjectCardsSection/hooks/useSoldOutProjectsIds';
import { ProjectStorySection } from 'components/organisms/ProjectStorySection/ProjectStorySection';
import { SellOrdersActionsBar } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar';
import { AVG_PRICE_TOOLTIP_PROJECT } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar.constants';
import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';
import { useOnBuyButtonClick } from 'hooks/useOnBuyButtonClick';

import { useLedger } from '../../../ledger';
import { NotFoundPage } from '../../../legacy-pages/NotFound/NotFound';
import { client as sanityClient } from '../../../lib/clients/apolloSanity';
import { GettingStartedResourcesSection } from '../../molecules';
import { ProjectTopSection } from '../../organisms';
import useGeojson from './hooks/useGeojson';
import { useGetProject } from './hooks/useGetProject';
import { useSortedDocuments } from './hooks/useSortedDocuments';
import { useStakeholders } from './hooks/useStakeholders';
import { ProjectDetailsBannerCard } from './ProjectDetails.BannerCard';
import { DataStream } from './ProjectDetails.DataStream';
import { ManagementActions } from './ProjectDetails.ManagementActions';
import { ProjectDetailsStakeholders } from './ProjectDetails.Stakeholders';
import {
  findSanityCreditClass,
  formatOtcCardData,
  getProjectGalleryPhotos,
  parseOffChainProject,
} from './ProjectDetails.utils';
import { ProjectDetailsTableTabs } from './tables/ProjectDetails.TableTabs';

const MoreProjects = dynamic(
  () => import('./ProjectDetails.MoreProjects').then(mod => mod.MoreProjects),
  {
    loading: () => <CircularProgress color="secondary" />,
  },
);
const PostFlow = dynamic(
  () =>
    import('components/organisms/PostFlow/PostFlow').then(mod => mod.PostFlow),
  {
    loading: () => <CircularProgress color="secondary" />,
    ssr: false,
  },
);
const Media = dynamic(
  () => import('./ProjectDetails.Media').then(mod => mod.Media),
  {
    loading: () => <Skeleton className="h-[224px] sm:h-[400px]" />,
  },
);

function ProjectDetails(): JSX.Element {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { id: projectId } = useParams<{ id: string }>();
  const { queryClient } = useLedger();
  const { isConnected, isKeplrMobileWeb, wallet, loginDisabled } = useWallet();

  const { activeAccount } = useAuth();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [draftPost, setDraftPost] = useState<
    Partial<PostFormSchemaType> | undefined
  >();
  const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);

  const { data: sanityProjectPageData } = useQuery(
    getAllProjectPageQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const sanityProjectPage = sanityProjectPageData?.allProjectPage?.[0];
  const gettingStartedResourcesSection =
    sanityProjectPage?.gettingStartedResourcesSection;

  const { data: sanitySoldOutProjects } = useQuery(
    getSoldOutProjectsQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const soldOutProjectsIds = useAllSoldOutProjectsIds({
    sanitySoldOutProjects,
  });

  const { data: sanityCreditClassData } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const setBuyFromProjectId = useSetAtom(buyFromProjectIdAtom);

  const {
    sanityProject,
    loadingSanityProject,
    projectBySlug,
    offchainProjectByIdData,
    isBuyFlowDisabled,
    projectsWithOrderData,
    loadingBuySellOrders,
    onChainProjectId,
    offChainProject,
    onChainCreditClassId,
    creditClassOnChain,
    cardSellOrders,
    slug,
    noProjectFound,
    anchoredMetadata,
    loadingAnchoredMetadata,
    projectResponse,
    loadingDb,
  } = useGetProject({ projectId });

  const onBuyButtonClick = useOnBuyButtonClick();

  const onChainProject = projectResponse?.project;
  const jurisdiction = onChainProject?.jurisdiction;

  /* Credit class */

  const creditClassMetadataRes = useQuery(
    getMetadataQuery({
      iri: creditClassOnChain?.class?.metadata,
      enabled: !!queryClient && !!creditClassOnChain?.class?.metadata,
      client: queryClient,
      languageCode: selectedLanguage,
    }),
  );
  const creditClassMetadata = creditClassMetadataRes?.data as
    | CreditClassMetadataLD
    | undefined;

  const { batchesWithSupply, setPaginationParams, paginationParams } =
    useFetchPaginatedBatches({ projectId: String(onChainProjectId) });
  const { totals: batchesTotal } = getBatchesTotal(
    batchesWithSupply ?? [],
    projectsWithOrderData[0]?.purchaseInfo?.sellInfo?.creditsAvailable,
  );

  const {
    offChainProjectMetadata,
    managementActions,
    projectDocs,
    creditClass,
    // creditClassName,
    creditClassVersion,
  } = parseOffChainProject(offChainProject as Maybe<Project>);

  const { sortCallbacksDocuments, sortedDocuments } = useSortedDocuments({
    projectDocs,
  });

  // For legacy/open projects (that are not on-chain), all metadata is stored off-chain
  const projectMetadata = (
    !!onChainProjectId ? anchoredMetadata : offChainProjectMetadata
  ) as ProjectMetadataLD;

  const {
    projectDeveloper,
    projectVerifier,
    program,
    admin,
    partners,
    projectOwner,
    projectOperator,
    projectMonitor,
  } = useStakeholders({
    projectMetadata,
    offChainProject,
    onChainProject,
    creditClassMetadata,
  });

  const { geojson, isGISFile } = useGeojson({
    projectMetadata,
    projectPageMetadata: offChainProjectMetadata,
  });

  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl:
      creditClass?.onChainId ??
      creditClassVersion?.metadata?.['schema:url'] ??
      onChainProjectId?.split('-')?.[0], // if no offChain credit class
  });
  const isCommunityCredit = !creditClassSanity;

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

  const onChainOrOffChainProjectId = onChainProjectId || offChainProject?.id;
  const openCreatePostModal = useCallback(() => {
    setIsCreatePostModalOpen(onChainOrOffChainProjectId);
  }, [onChainOrOffChainProjectId]);

  const projectPrefinancing = sanityProject?.projectPrefinancing;
  const isPrefinanceProject = projectPrefinancing?.isPrefinanceProject;

  const normalizedProject = useMemo(
    () =>
      normalizeProjectWithMetadata({
        offChainProject,
        projectWithOrderData: projectsWithOrderData[0],
        projectMetadata: projectMetadata,
        projectPageMetadata: offChainProjectMetadata,
        classMetadata: creditClassMetadata,
        sanityClass: creditClassSanity,
        sanityProject,
        projectPrefinancing,
      }),
    [
      offChainProject,
      projectsWithOrderData,
      projectMetadata,
      offChainProjectMetadata,
      creditClassMetadata,
      creditClassSanity,
      sanityProject,
      projectPrefinancing,
    ],
  );

  const { data: terrasosBookCallData } = useQuery(
    getTerrasosBookCallQuery({
      sanityClient,
      languageCode: selectedLanguage,
      enabled: !!sanityClient && IS_TERRASOS,
    }),
  );
  const terrasosBookCall = terrasosBookCallData?.allTerrasosBookCall?.[0];

  const projectPhotos = getProjectGalleryPhotos({ offChainProjectMetadata });
  const hasProjectPhotos = projectPhotos.length > 0;
  const onBookCallButtonClick = () =>
    onBtnClick(
      () => void 0,
      IS_REGEN ? sanityProjectPage?.otcCard?.button : terrasosBookCall?.button,
    );
  const otcCard = formatOtcCardData({
    data: sanityProjectPage?.otcCard,
    isConnected,
    orders: projectsWithOrderData[0]?.sellOrders,
    hideOtcCard: isCommunityCredit || !onChainProjectId,
    setBuyFromProjectId,
    projectId,
  });

  const isAdmin =
    (!!activeAccount?.addr && onChainProject?.admin === activeAccount?.addr) ||
    (!!activeAccount?.id &&
      offChainProject?.adminAccountId === activeAccount?.id) ||
    !!(
      loginDisabled &&
      wallet?.address &&
      wallet?.address === onChainProject?.admin
    );

  const isProjectPublished = onChainProjectId
    ? !!onChainProjectId
    : offchainProjectByIdData?.data?.projectById?.published ||
      projectBySlug?.data.projectBySlug?.published;
  const projectLocation = projectMetadata?.['schema:location'];

  const isTerrasos = normalizedProject.type === 'TerrasosProjectInfo';

  if (noProjectFound) return <NotFoundPage />;

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <ProjectDetailsBannerCard
        offChainProject={offChainProject}
        onChainProject={onChainProject}
        content={sanityProjectPage?.bannerCard}
        slug={slug}
      />

      <Media
        isPrefinanceProject={isPrefinanceProject}
        bodyTexts={bodyTexts}
        geojson={geojson}
        jurisdiction={jurisdiction}
        onChainProjectMetadata={projectMetadata}
        offChainProjectMetadata={offChainProjectMetadata}
      />

      {(onChainProjectId ||
        isPrefinanceProject ||
        isTerrasos ||
        (isAdmin && !loginDisabled)) && (
        <SellOrdersActionsBar
          isBuyButtonDisabled={isBuyFlowDisabled || loadingSanityProject}
          isCommunityCredit={isCommunityCredit}
          onBookCallButtonClick={onBookCallButtonClick}
          isAdmin={isAdmin}
          onBuyButtonClick={() => {
            onBuyButtonClick({
              projectId,
              loading: loadingSanityProject || loadingBuySellOrders,
              cardSellOrders,
            });
          }}
          onChainProjectId={onChainProjectId}
          offChainProjectId={offChainProject?.id}
          projectName={anchoredMetadata?.['schema:name']}
          onChainCreditClassId={onChainProject?.classId}
          avgPricePerTonLabel={
            projectsWithOrderData[0]?.purchaseInfo?.sellInfo
              ?.avgPricePerTonLabel
          }
          avgPricePerTonTooltip={_(AVG_PRICE_TOOLTIP_PROJECT)}
          prefinancePrice={
            projectPrefinancing?.price
              ? getPriceToDisplay({
                  price: projectPrefinancing?.price,
                })
              : undefined
          }
          isPrefinanceProject={isPrefinanceProject}
          isSoldOut={isSoldOut}
          onClickCreatePost={openCreatePostModal}
          isCreatePostButtonDisabled={!projectLocation || !isProjectPublished}
          tooltipText={_(CREATE_POST_DISABLED_TOOLTIP_TEXT)}
          isTerrasos={isTerrasos}
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
                    {bodyTexts.prefinance}
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
        normalizedProject={normalizedProject}
        terrasosBookCall={terrasosBookCall}
      />

      {hasProjectPhotos && (
        <Gallery
          items={projectPhotos}
          sx={{ mb: 25 }}
          allImages
          photoCredit={_(PHOTO_CREDIT)}
        />
      )}

      <ProjectStorySection
        projectPageMetadata={offChainProjectMetadata}
        sx={{ pt: { xs: 0 } }}
      />

      <ProjectDetailsStakeholders
        projectDeveloper={projectDeveloper}
        projectVerifier={projectVerifier}
        projectOwner={projectOwner}
        projectOperator={projectOperator}
        projectMonitor={projectMonitor}
        program={program}
        admin={admin}
        partners={partners}
      />

      <DetailsSection
        header={sanityProjectPage?.projectDetailsSection}
        credibilityCards={sanityProject?.credibilityCards}
        projectId={projectId}
        sx={{ pt: { xs: 0 } }}
      />

      <DataStream
        adminAddr={offChainProject?.accountByAdminAccountId?.addr}
        adminAccountId={offChainProject?.adminAccountId}
        offChainProjectId={offChainProject?.id}
        adminDescription={sanityProjectPage?.dataStreamAdminDescriptionRaw}
        projectLocation={projectLocation}
        openCreatePostModal={openCreatePostModal}
        setDraftPost={setDraftPost}
      />

      <ProjectDetailsTableTabs
        sortedDocuments={sortedDocuments}
        sortCallbacksDocuments={sortCallbacksDocuments}
        offChainProject={offChainProject}
        projectMetadata={projectMetadata as ProjectMetadataLD}
        onChainProjectId={onChainProjectId}
        batchData={{
          batches: batchesWithSupply,
          totals: batchesTotal,
        }}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        _={_}
        sx={{ pt: { xs: 0 } }}
      />

      {managementActions && <ManagementActions actions={managementActions} />}

      {onChainOrOffChainProjectId && admin && (
        <MoreProjects
          skippedProjectId={onChainOrOffChainProjectId}
          projectAdmin={admin}
        />
      )}

      {gettingStartedResourcesSection && IS_REGEN && (
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

      {isCreatePostModalOpen && projectLocation && (
        <PostFlow
          onModalClose={() => {
            setIsCreatePostModalOpen(false);
          }}
          projectLocation={projectLocation}
          projectId={onChainOrOffChainProjectId}
          offChainProjectId={offChainProject?.id}
          projectName={projectMetadata?.['schema:name']}
          projectSlug={slug}
          initialValues={{
            iri: draftPost?.iri,
            title: draftPost?.title || '',
            comment: draftPost?.comment || '',
            files: draftPost?.files || [],
            privacyType: draftPost?.privacyType || 'public',
            published: draftPost?.published || true,
          }}
          setDraftPost={setDraftPost}
        />
      )}
    </Box>
  );
}

export { ProjectDetails };
