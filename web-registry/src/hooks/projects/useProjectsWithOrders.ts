import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import {
  fetchSimplePrice,
  GECKO_EEUR_ID,
  GECKO_TOKEN_IDS,
  GECKO_USD_CURRENCY,
  GECKO_USDC_ID,
} from 'lib/coingecko';
import { getProjectsByClassQuery } from 'lib/queries/react-query/ecocredit/getProjectsByClass/getProjectsByClassQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersQuery } from 'lib/queries/react-query/marketplace/getSellOrdersQuery/getSellOrdersQuery';

import {
  ProjectsSellOrders,
  useProjectsSellOrders,
} from 'pages/Projects/hooks/useProjectsSellOrders';

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

  /* Queries */

  const { data: projectsData } = useQuery(
    getProjectsQuery({
      enabled: !classId,
      client: ecocreditClient,
      request: {},
    }),
  );
  const { data: projectsByClassData } = useQuery(
    getProjectsByClassQuery({
      enabled: !!classId,
      client: ecocreditClient,
      request: { classId },
    }),
  );
  const regenPriceQuery = useQuery(['regenPrice'], () =>
    fetchSimplePrice({
      ids: GECKO_TOKEN_IDS,
      vsCurrencies: GECKO_USD_CURRENCY,
    }),
  );
  const { data: sellOrders } = useQuery(
    getSellOrdersQuery({
      client: marketplaceClient,
      reactQueryClient,
      request: {},
    }),
  );

  /* Filtering/Sorting */

  const projects = projectsData?.projects ?? projectsByClassData?.projects;
  const selectedProjects = selectProjects({
    projects,
    sellOrders,
    metadata,
    random,
    projectId,
  });

  const { projectsWithOrderData, loading: loadingWithOrders } =
    useProjectsSellOrders({
      projects: selectedProjects,
      sellOrders,
      geckoPrices: {
        regenPrice: regenPriceQuery?.data?.regen?.usd,
        eeurPrice: regenPriceQuery?.data?.[GECKO_EEUR_ID]?.usd,
        usdcPrice: regenPriceQuery?.data?.[GECKO_USDC_ID]?.usd,
      },
      limit,
    });

  return {
    projectsWithOrderData,
    loading: loadingWithOrders,
  };
}
