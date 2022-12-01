import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { GECKO_EEUR_ID, GECKO_USDC_ID } from 'lib/coingecko';
import { normalizeProjectsWithOrderData } from 'lib/normalizers/normalizeProjectsWithOrderData';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectsByClassQuery } from 'lib/queries/react-query/ecocredit/getProjectsByClass/getProjectsByClassQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectsSellOrders } from 'pages/Projects/hooks/useProjectsSellOrders';
import { sortProjectsBySellOrdersAvailability } from 'pages/Projects/hooks/useProjectsSellOrders.utils';

import { selectProjects } from './useProjectsWithOrders.utils';

export interface ProjectsWithOrdersProps {
  limit?: number;
  metadata?: boolean; // to discard projects without metadata prop
  random?: boolean; // to shuffle the projects (along with limit allows a random subselection)
  projectId?: string; // to discard an specific project
  classId?: string; // to filter by class
}

/**
 * Get projects and sell orders and merge them both normalizing
 */
export function useProjectsWithOrders({
  limit,
  metadata = false,
  random = false,
  projectId,
  classId,
}: ProjectsWithOrdersProps): ProjectsSellOrders {
  const { ecocreditClient, marketplaceClient } = useLedger();

  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();

  /* Main Queries */

  const { data: projectsData, isFetching: isLoadingProjects } = useQuery(
    getProjectsQuery({
      enabled: !classId && !!ecocreditClient,
      client: ecocreditClient,
      request: {},
    }),
  );

  const { data: projectsByClassData, isFetching: isLoadingProjectsByClass } =
    useQuery(
      getProjectsByClassQuery({
        enabled: !!classId && !!ecocreditClient,
        client: ecocreditClient,
        request: { classId },
      }),
    );

  const simplePrice = useQuery(getSimplePriceQuery({}));
  const { data: sellOrders } = useQuery(
    getSellOrdersExtendedQuery({
      enabled: !!marketplaceClient,
      client: marketplaceClient,
      reactQueryClient,
      request: {},
    }),
  );

  /* Filtering/Sorting */

  const projects = projectsData?.projects ?? projectsByClassData?.projects;
  const selectedProjects =
    selectProjects({
      projects,
      sellOrders,
      metadata,
      random,
      projectId,
    }) ?? [];
  const sortedProjects = selectedProjects
    .sort(sortProjectsBySellOrdersAvailability(sellOrders ?? []))
    .slice(0, limit);

  /* Metadata queries */

  const metadataResults = useQueries({
    queries: sortedProjects.map(project =>
      getMetadataQuery({ iri: project.metadata }),
    ),
  });
  const metadatas = metadataResults.map(queryResult => queryResult.data);

  /* Normalization */

  const projectsWithOrderData = normalizeProjectsWithOrderData({
    projects: sortedProjects,
    sellOrders,
    geckoPrices: {
      regenPrice: simplePrice?.data?.regen?.usd,
      eeurPrice: simplePrice?.data?.[GECKO_EEUR_ID]?.usd,
      usdcPrice: simplePrice?.data?.[GECKO_USDC_ID]?.usd,
    },
    metadatas,
    userAddress: wallet?.address,
  });

  return {
    projectsWithOrderData,
    loading: isLoadingProjects || isLoadingProjectsByClass,
  };
}
