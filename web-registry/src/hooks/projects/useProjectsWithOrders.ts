import { useMemo } from 'react';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import {
  ProjectsSellOrders,
  useProjectsSellOrders,
} from 'pages/Projects/hooks/useProjectsSellOrders';
import useEcocreditQuery from 'hooks/useEcocreditQuery';
import { useQuerySellOrders } from 'hooks/useQuerySellOrders';

interface ProjectsWithOrdersProps {
  limit?: number;
}

/**
 * Get projects and sell orders and merge them both normalizing
 */
export function useProjectsWithOrders({
  limit,
}: ProjectsWithOrdersProps): ProjectsSellOrders {
  const { data: ecocreditData } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });
  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;

  // discard projects without metadata
  const projects = useMemo(
    () => ecocreditData?.projects?.filter(project => project.metadata),
    [ecocreditData?.projects],
  );

  return useProjectsSellOrders({
    projects,
    sellOrders,
    limit,
  });
}
