import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { normalizeProjectsWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';

interface Response {
  projects: ProjectWithOrderData[];
  isProjectsLoading: boolean;
}

interface Props {
  projectIds?: string[];
}

export const useFetchProjectsByIdsWithOrders = ({
  projectIds,
}: Props): Response => {
  const { marketplaceClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const graphqlClient = useApolloClient();
  const { wallet } = useWallet();

  const { projects, isProjectsLoading, projectsMetadata, classesMetadata } =
    useProjectsWithMetadata(projectIds);

  // Sell Orders
  const { data: sellOrders } = useQuery(
    getSellOrdersExtendedQuery({
      enabled: !!marketplaceClient,
      client: marketplaceClient,
      reactQueryClient,
      request: {},
    }),
  );

  const projectsWithOrderData = normalizeProjectsWithOrderData({
    projects: projects
      .map(project => project?.project)
      .filter(project => project !== undefined) as ProjectInfo[],
    sellOrders,
    userAddress: wallet?.address,
  });

  const offChainProjectResults = useQueries({
    queries: projects.map(project =>
      getProjectByOnChainIdQuery({
        client: graphqlClient,
        onChainId: project?.project?.id ?? '',
        enabled: !!project?.project?.id,
      }),
    ),
  });

  const projectPagesMetadata = offChainProjectResults.map(
    queryResult => queryResult.data?.data.projectByOnChainId?.metadata,
  );

  const programParties = offChainProjectResults.map(
    queryResult =>
      queryResult.data?.data.projectByOnChainId?.creditClassByCreditClassId
        ?.partyByRegistryId,
  );

  /* Final Normalization */

  const projectsWithMetadata = normalizeProjectsWithMetadata({
    projectsWithOrderData,
    projectsMetadata,
    projectPagesMetadata,
    programParties,
    classesMetadata,
  });
  return {
    projects: projectsWithMetadata,
    isProjectsLoading,
  };
};
