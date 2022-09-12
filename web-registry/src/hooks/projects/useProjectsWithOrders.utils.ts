import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

export const isOtherProject = (
  project: ProjectInfo,
  projectId: string,
): boolean => project.id !== projectId;

export const hasMetadata = (project: ProjectInfo): boolean =>
  !!project.metadata;

const hasSellOrders = (
  project: ProjectInfo,
  sellOrders: SellOrderInfo[],
): boolean =>
  sellOrders.some(sellOrder => sellOrder?.batchDenom?.startsWith(project.id));

export const prioritizeWithSellOrders = (
  projects: ProjectInfo[],
  sellOrders: SellOrderInfo[],
  limit?: number,
): ProjectInfo[] => {
  const projectsWithOrders = projects.filter(projs =>
    hasSellOrders(projs, sellOrders),
  );

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
