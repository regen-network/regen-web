import { useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getProjectByIdQuery as getOffChainProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery';

import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';

import { client as sanityClient } from '../../../../lib/clients/sanity';
import { getIsOnChainId, getIsUuid } from '../ProjectDetails.utils';

export const useGetProject = () => {
  const { projectId } = useParams();
  const graphqlClient = useApolloClient();
  const { ecocreditClient } = useLedger();

  // First, check if projectId is an on-chain project id
  // or an off-chain project UUID.
  // If neither of those, it's a project slug.
  const isOnChainId = getIsOnChainId(projectId);
  const isOffChainUuid = getIsUuid(projectId);

  const { data: sanityProjectData, isInitialLoading: loadingSanityProject } =
    useQuery(
      getProjectByIdQuery({
        id: projectId as string,
        sanityClient,
        enabled: !!sanityClient && !!projectId,
      }),
    );
  const sanityProject = sanityProjectData?.allProject?.[0];

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

  const { isBuyFlowDisabled, projectsWithOrderData, loadingBuySellOrders } =
    useBuySellOrderData({
      projectId: onChainProjectId,
    });

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
      client: ecocreditClient,
      request: {
        classId: onChainCreditClassId ?? '',
      },
      enabled: !!ecocreditClient && !!onChainCreditClassId,
    }),
  );

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
  };
};
