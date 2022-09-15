import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import {
  fetchSimplePrice,
  GECKO_REGEN_ID,
  GECKO_USD_CURRENCY,
} from 'lib/coingecko';

import {
  ProjectsSellOrders,
  useProjectsSellOrders,
} from 'pages/Projects/hooks/useProjectsSellOrders';
import useEcocreditQuery from 'hooks/useEcocreditQuery';
import { useQuerySellOrders } from 'hooks/useQuerySellOrders';

import { selectProjects } from './useProjectsWithOrders.utils';

export interface ProjectsWithOrdersProps {
  limit?: number;
  metadata?: boolean; // to discard projects without metadata prop
  random?: boolean; // to shuffle the projects (along with limit allows a random subselection)
  projectId?: string; // to discard an specific project
}

/**
 * Get projects and sell orders and merge them both normalizing
 */
export function useProjectsWithOrders({
  limit,
  metadata = false,
  random = false,
  projectId,
}: ProjectsWithOrdersProps): ProjectsSellOrders {
  const { data, loading: loadingProjects } =
    useEcocreditQuery<QueryProjectsResponse>({
      query: 'projects',
      params: {},
    });
  const projects = data?.projects;

  const regenPriceQuery = useQuery(['regenPrice'], () =>
    fetchSimplePrice({ ids: GECKO_REGEN_ID, vsCurrencies: GECKO_USD_CURRENCY }),
  );

  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;

  const { projectsWithOrderData, loading: loadingWithOrders } =
    useProjectsSellOrders({
      projects: selectProjects({
        projects,
        sellOrders,
        metadata,
        random,
        projectId,
      }),
      sellOrders,
      regenPrice: regenPriceQuery?.data?.regen?.usd,
      limit,
    });

  return {
    projectsWithOrderData,
    loading: loadingProjects || loadingWithOrders,
  };
}
