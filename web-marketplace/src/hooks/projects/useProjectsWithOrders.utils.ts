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
  skippedClassId?: string;
  adminAddr?: string;
  enoughProjectsByAdmin: boolean;
  limit?: number;
}

export function selectProjects({
  projects,
  sellOrders,
  metadata = false,
  random = false,
  skippedProjectId,
  skippedClassId,
  adminAddr,
  enoughProjectsByAdmin,
  limit,
}: SelectProjectsParams): ProjectInfo[] | undefined {
  if (!projects || !sellOrders) return;

  let _projects;

  if (skippedProjectId)
    _projects = projects.filter(p => isOtherProject(p, skippedProjectId));
  else _projects = [...projects];

  if (skippedClassId)
    _projects = _projects.filter(p => p.classId !== skippedClassId);

  if (random) {
    if (adminAddr && limit) {
      // In the case where we want to filter by projects admin
      // but the number of projects by this admin is under the provided limit,
      // we need to fill in the rest from other admins' projects
      if (!enoughProjectsByAdmin) {
        const adminProjects = _projects.filter(
          project => project.admin === adminAddr,
        );

        const otherProjects = _projects.filter(
          project => project.admin !== adminAddr,
        );
        const shuffledOthers = shuffle(otherProjects).filter(hasMetadata);

        const needed = limit - adminProjects.length;
        return [...adminProjects, ...shuffledOthers.slice(0, needed)];
      } else {
        // If we have enough projects by the admin,
        // we just shuffle without filtering those without metadata
        return shuffle(_projects);
      }
    }
    return shuffle(_projects).filter(hasMetadata);
  }
  if (metadata) return _projects.filter(hasMetadata);

  return _projects;
}
