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
  metadata?: boolean; // to discard projects without metadata prop
}

/**
 * Get projects and sell orders and merge them both normalizing
 */
export function useProjectsWithOrders({
  limit,
  metadata = false,
}: ProjectsWithOrdersProps): ProjectsSellOrders {
  const { data, loading: loadingProjects } =
    useEcocreditQuery<QueryProjectsResponse>({
      query: 'projects',
      params: {},
    });
  const projects = data?.projects;

  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;

  const projectsWithMetadata = useMemo(
    () => projects?.filter(project => project.metadata),
    [projects],
  );

  const { projectsWithOrderData, loading: loadingWithOrders } =
    useProjectsSellOrders({
      projects: metadata ? projectsWithMetadata : projects,
      sellOrders,
      limit,
    });

  return {
    projectsWithOrderData,
    loading: loadingProjects || loadingWithOrders,
  };
}
