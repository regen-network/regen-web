import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import {
  ProjectInfo,
  QueryProjectsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import shuffle from 'lodash/shuffle';

import {
  ProjectsSellOrders,
  useProjectsSellOrders,
} from 'pages/Projects/hooks/useProjectsSellOrders';
import useEcocreditQuery from 'hooks/useEcocreditQuery';
import { useQuerySellOrders } from 'hooks/useQuerySellOrders';

import {
  hasMetadata,
  isOtherProject,
  prioritizeWithSellOrders,
} from './useProjectsWithOrders.utils';

interface ProjectsWithOrdersProps {
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

  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;

  const { projectsWithOrderData, loading: loadingWithOrders } =
    useProjectsSellOrders({
      projects: selectProjects(projects, sellOrders),
      sellOrders,
      limit,
    });

  function selectProjects(
    _projects: ProjectInfo[] | undefined,
    sellOrders: SellOrderInfo[] | undefined,
  ): ProjectInfo[] | undefined {
    if (!_projects || !sellOrders) return;

    if (projectId)
      _projects = _projects.filter(proj => isOtherProject(proj, projectId));

    if (random)
      return prioritizeWithSellOrders(
        shuffle(_projects).filter(hasMetadata),
        sellOrders,
        limit,
      );

    if (metadata) return _projects.filter(hasMetadata);

    return _projects;
  }

  return {
    projectsWithOrderData,
    loading: loadingProjects || loadingWithOrders,
  };
}
