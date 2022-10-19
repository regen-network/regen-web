import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import {
  fetchSimplePrice,
  GECKO_EEUR_ID,
  GECKO_TOKEN_IDS,
  GECKO_USD_CURRENCY,
  GECKO_USDC_ID,
} from 'lib/coingecko';
import { EcocreditQueryProps } from 'lib/ecocredit/api';

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
  const queryParams: EcocreditQueryProps = classId
    ? { query: 'projectsByClass', params: { classId } }
    : { query: 'projects', params: {} };

  const { data, loading: loadingProjects } =
    useEcocreditQuery<QueryProjectsResponse>(queryParams);
  const projects = data?.projects;

  const regenPriceQuery = useQuery(['regenPrice'], () =>
    fetchSimplePrice({
      ids: GECKO_TOKEN_IDS,
      vsCurrencies: GECKO_USD_CURRENCY,
    }),
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
      geckoPrices: {
        regenPrice: regenPriceQuery?.data?.regen?.usd,
        eeurPrice: regenPriceQuery?.data?.[GECKO_EEUR_ID]?.usd,
        usdcPrice: regenPriceQuery?.data?.[GECKO_USDC_ID]?.usd,
      },
      limit,
    });

  return {
    projectsWithOrderData,
    loading: loadingProjects || loadingWithOrders,
  };
}
