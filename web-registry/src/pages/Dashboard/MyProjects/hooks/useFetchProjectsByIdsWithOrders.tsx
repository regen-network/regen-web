import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { GECKO_EEUR_ID, GECKO_USDC_ID } from 'lib/coingecko';
import { normalizeProjectsWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
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
  const simplePrice = useQuery(getSimplePriceQuery({}));
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
    geckoPrices: {
      regenPrice: simplePrice?.data?.regen?.usd,
      evmosPrice: simplePrice?.data?.evmos?.usd,
      eeurPrice: simplePrice?.data?.[GECKO_EEUR_ID]?.usd,
      usdcPrice: simplePrice?.data?.[GECKO_USDC_ID]?.usd,
    },
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

  /* Final Normalization */

  const projectsWithMetadata = normalizeProjectsWithMetadata({
    projectsWithOrderData,
    projectsMetadata,
    projectPagesMetadata,
    classesMetadata,
  });
  return {
    projects: projectsWithMetadata,
    isProjectsLoading,
  };
};
