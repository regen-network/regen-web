import { useApolloClient } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByIdQuery as getOffChainProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';

import { useBuySellOrderData } from 'hooks/useBuySellOrderData';

import { client as sanityClient } from '../../../../lib/clients/apolloSanity';
import { getIsOnChainId, getIsUuid } from '../ProjectDetails.utils';

export const useGetProject = ({ projectId }: { projectId?: string }) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient = useApolloClient();
  const { queryClient } = useLedger();

  // First, check if projectId is an on-chain project id
  // or an off-chain project UUID.
  // If neither of those, it's a project slug.
  const isOnChainId = getIsOnChainId(projectId);
  const isOffChainUuid = getIsUuid(projectId);

  // if projectId is slug, query project by slug
  const { data: projectBySlug, isLoading: loadingProjectBySlug } = useQuery(
    getProjectBySlugQuery({
      client: graphqlClient,
      slug: projectId as string,
      enabled: !!projectId && !isOnChainId && !isOffChainUuid,
      languageCode: selectedLanguage,
    }),
  );

  // else fetch project by onChainId
  const { data: projectByOnChainId, isLoading: loadingProjectByOnChainId } =
    useQuery(
      getProjectByOnChainIdQuery({
        client: graphqlClient,
        enabled: !!projectId && !!isOnChainId,
        onChainId: projectId as string,
        languageCode: selectedLanguage,
      }),
    );

  // else fetch project by uuid
  const {
    data: offchainProjectByIdData,
    isLoading: loadingOffchainProjectById,
  } = useQuery(
    getOffChainProjectByIdQuery({
      client: graphqlClient,
      enabled: !!projectId && !!isOffChainUuid,
      id: projectId,
      languageCode: selectedLanguage,
    }),
  );

  const projectBySlugOnChainId =
    projectBySlug?.data.projectBySlug?.onChainId ?? undefined;
  const projectByUuidOnChainId =
    offchainProjectByIdData?.data.projectById?.onChainId ?? undefined;
  const onChainProjectId = isOnChainId
    ? projectId
    : projectBySlugOnChainId ?? projectByUuidOnChainId;

  const { data: projectResponse, isLoading: loadingOnChainProject } = useQuery(
    getProjectQuery({
      request: { projectId: onChainProjectId as string },
      client: queryClient,
      enabled: !!queryClient && !!onChainProjectId,
    }),
  );

  const onChainProject = projectResponse?.project;
  /** Anchored project metadata comes from IRI resolver. */
  const { data, isLoading: loadingAnchoredMetadata } = useQuery(
    getMetadataQuery({
      iri: onChainProject?.metadata,
      client: queryClient,
      enabled: !!queryClient,
      languageCode: selectedLanguage,
    }),
  );
  const anchoredMetadata = data as AnchoredProjectMetadataLD | undefined;

  const offChainProjectById = offchainProjectByIdData?.data.projectById;
  const publishedOffchainProjectById = offChainProjectById?.published
    ? offChainProjectById
    : undefined;
  const publishedOffchainProjectBySlug = projectBySlug?.data?.projectBySlug
    ?.published
    ? projectBySlug?.data?.projectBySlug
    : undefined;

  const offChainProject = isOnChainId
    ? projectByOnChainId?.data.projectByOnChainId
    : publishedOffchainProjectById ?? publishedOffchainProjectBySlug;

  const onChainCreditClassId =
    offChainProject?.creditClassByCreditClassId?.onChainId ??
    onChainProjectId?.split('-')?.[0];
  const { data: creditClassOnChain } = useQuery(
    getClassQuery({
      client: queryClient,
      request: {
        classId: onChainCreditClassId ?? '',
      },
      enabled: !!queryClient && !!onChainCreditClassId,
    }),
  );

  const slug =
    offchainProjectByIdData?.data?.projectById?.slug ||
    projectByOnChainId?.data?.projectByOnChainId?.slug ||
    projectBySlug?.data.projectBySlug?.slug;

  const slugOrId = slug || onChainProjectId || offChainProject?.id;

  const { isBuyFlowDisabled, projectsWithOrderData, loadingBuySellOrders } =
    useBuySellOrderData({
      projectId: onChainProjectId,
      projectSlugOrId: slugOrId,
      isOffChainProject: !onChainProjectId,
    });

  const sellOrders = projectsWithOrderData?.[0]?.filteredSellOrders || [];
  const cardSellOrders = projectsWithOrderData?.[0]?.cardSellOrders || [];

  const { data: sanityProjectData, isLoading: loadingSanityProject } = useQuery(
    getProjectByIdQuery({
      id: slugOrId as string,
      sanityClient,
      enabled: !!sanityClient && !!slugOrId,
      languageCode: selectedLanguage,
    }),
  );
  const sanityProject = sanityProjectData?.allProject?.[0];

  const loadingDb =
    loadingProjectByOnChainId ||
    loadingProjectBySlug ||
    loadingOffchainProjectById;

  const noProjectFound =
    !loadingDb &&
    !loadingOnChainProject &&
    !loadingAnchoredMetadata &&
    !offChainProject &&
    !!queryClient &&
    !projectResponse;

  return {
    sanityProject,
    loadingSanityProject,
    projectBySlug,
    loadingProjectBySlug,
    projectByOnChainId,
    loadingProjectByOnChainId,
    offchainProjectByIdData,
    loadingOffchainProjectById,
    isBuyFlowDisabled,
    projectsWithOrderData,
    onChainProjectId,
    offChainProject,
    onChainCreditClassId,
    creditClassOnChain,
    loadingBuySellOrders,
    sellOrders,
    cardSellOrders,
    slug,
    noProjectFound,
    anchoredMetadata,
    loadingAnchoredMetadata,
    projectResponse,
    loadingDb,
  };
};
