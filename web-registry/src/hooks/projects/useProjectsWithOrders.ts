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

const hasMetadata = (project: ProjectInfo): boolean => !!project.metadata;

const hasSellOrders = (
  project: ProjectInfo,
  sellOrders: SellOrderInfo[],
): boolean =>
  sellOrders.some(sellOrder => sellOrder?.batchDenom?.startsWith(project.id));

const prioritizeWithSellOrders = (
  projects: ProjectInfo[],
  sellOrders: SellOrderInfo[],
  limit?: number,
): ProjectInfo[] => {
  const projectsWithOrders = projects.filter(projs =>
    hasSellOrders(projs, sellOrders),
  );
  // if (!limit || projectsWithOrders.length >= limit) return projectsWithOrders;

  // if there is a limit, check if there are already enough projects in the
  // `projectsWithOrders` subselect
  if (limit && projectsWithOrders.length >= limit) return projectsWithOrders;

  // if there are no limits, or there are not enough projects with the previous
  // subselect of `projectsWithOrders`
  // then we additionally make the subselection of the projects that do not
  // present sell orders
  const additionalProjects = projects.filter(
    p1 => !projectsWithOrders.some(p2 => p1.id === p2.id),
  );

  // finally we return the two subsets, first with sell orders and then without
  // sell orders.

  if (!limit) return [...projectsWithOrders, ...additionalProjects];

  // If there is a limit then it is applied from the beginning
  const numProjects = limit - projectsWithOrders.length;
  return [...projectsWithOrders, ...additionalProjects.slice(0, numProjects)];
};

const isOtherProject = (project: ProjectInfo, projectId: string): boolean =>
  project.id !== projectId;

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
