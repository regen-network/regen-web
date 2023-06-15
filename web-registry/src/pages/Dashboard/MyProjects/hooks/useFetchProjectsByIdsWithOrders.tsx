import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { GECKO_EEUR_ID, GECKO_USDC_ID } from 'lib/coingecko';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { normalizeProjectsWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/projects/normalizeProjectsWithOrderData';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

interface Response {
  projects: ProjectWithOrderData[];
  isLoadingProjects: boolean;
}

interface Props {
  projectIds?: string[];
}

export const useFetchProjectsByIdsWithOrders = ({
  projectIds,
}: Props): Response => {
  const { ecocreditClient, marketplaceClient, dataClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const graphqlClient = useApolloClient();
  const { wallet } = useWallet();

  // Projects
  const projectsResults = useQueries({
    queries:
      projectIds?.map(projectId =>
        getProjectQuery({
          request: {
            projectId,
          },
          client: ecocreditClient,
        }),
      ) ?? [],
  });
  const projects = projectsResults
    .map(projectResult => projectResult.data?.project)
    .filter(project => project !== undefined) as ProjectInfo[];
  const isLoadingProjects = projectsResults.some(
    projectResult => projectResult.isLoading,
  );

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
    projects,
    sellOrders,
    geckoPrices: {
      regenPrice: simplePrice?.data?.regen?.usd,
      evmosPrice: simplePrice?.data?.evmos?.usd,
      eeurPrice: simplePrice?.data?.[GECKO_EEUR_ID]?.usd,
      usdcPrice: simplePrice?.data?.[GECKO_USDC_ID]?.usd,
    },
    userAddress: wallet?.address,
  });

  // Metadatas
  const metadatasResults = useQueries({
    queries: projects?.map(project =>
      getMetadataQuery({
        iri: project?.metadata,
        dataClient,
        enabled: !!dataClient,
      }),
    ),
  });

  const metadatas = metadatasResults.map(metadataResult => {
    return metadataResult.data;
  });

  const offChainProjectResults = useQueries({
    queries: projects.map(project =>
      getProjectByOnChainIdQuery({
        client: graphqlClient,
        onChainId: project.id,
      }),
    ),
  });
  const projectPageMetadatas = offChainProjectResults.map(
    queryResult => queryResult.data?.data.projectByOnChainId?.metadata,
  );

  /* Final Normalization */

  const projectsWithMetadata = normalizeProjectsWithMetadata({
    projectsWithOrderData,
    metadatas: metadatas as (AnchoredProjectMetadataLD | undefined)[],
    projectPageMetadatas,
  });
  return {
    projects: projectsWithMetadata,
    isLoadingProjects,
  };
};
