import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import shuffle from 'lodash/shuffle';

import { ProjectsWithOrdersProps } from './useProjectsWithOrders';

const isOtherProject = (project: ProjectInfo, projectId: string): boolean =>
  project.id !== projectId;

const hasMetadata = (project: ProjectInfo): boolean => !!project.metadata;

interface SelectProjectsParams extends ProjectsWithOrdersProps {
  projects: ProjectInfo[] | undefined;
  sellOrders: SellOrderInfo[] | undefined;
}

export function selectProjects({
  projects,
  sellOrders,
  metadata = false,
  random = false,
  projectId,
}: SelectProjectsParams): ProjectInfo[] | undefined {
  if (!projects || !sellOrders) return;

  let _projects;

  if (projectId) _projects = projects.filter(p => isOtherProject(p, projectId));
  else _projects = [...projects];

  if (random) return shuffle(_projects).filter(hasMetadata);
  if (metadata) return _projects.filter(hasMetadata);
  return _projects;
}
