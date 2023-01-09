import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import shuffle from 'lodash/shuffle';

import { ProjectsWithOrdersProps } from './useProjectsWithOrders';

const isOtherProject = (
  project: ProjectInfo,
  skippedProjectId: string,
): boolean => project.id !== skippedProjectId;

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
  skippedProjectId,
}: SelectProjectsParams): ProjectInfo[] | undefined {
  if (!projects || !sellOrders) return;

  let _projects;

  if (skippedProjectId)
    _projects = projects.filter(p => isOtherProject(p, skippedProjectId));
  else _projects = [...projects];

  if (random) return shuffle(_projects).filter(hasMetadata);
  if (metadata) return _projects.filter(hasMetadata);
  return _projects;
}
