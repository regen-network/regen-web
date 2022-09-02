import { useMemo } from 'react';
import shuffle from 'lodash/shuffle';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

const PROJECTS_LIMIT = 3;

export default function useMoreProjects(
  projectId: string,
): ProjectWithOrderData[] {
  // get normalized projects with sell order data
  const { projectsWithOrderData } = useProjectsWithOrders({
    limit: PROJECTS_LIMIT,
  });

  // discard the current project
  const otherProjects = useMemo(() => {
    return projectsWithOrderData.filter(
      (project: ProjectWithOrderData): boolean => project.id !== projectId,
    );
  }, [projectsWithOrderData, projectId]);

  // previous selection of projects with orders
  const projectsWithSellOrders = useMemo(() => {
    return otherProjects.filter(
      (project: ProjectWithOrderData): boolean => project.sellOrders.length > 0,
    );
  }, [otherProjects]);

  // final random selection, prioritazing projects with sell orders, if any
  const projectsSelected = useMemo(() => {
    const _projectsSelected: ProjectWithOrderData[] = [];

    if (projectsWithSellOrders.length > 0) {
      _projectsSelected.push(
        ...shuffle(projectsWithSellOrders).slice(0, PROJECTS_LIMIT),
      );
    }

    if (_projectsSelected.length === 0)
      return shuffle(projectsWithOrderData).slice(0, PROJECTS_LIMIT);

    if (_projectsSelected.length < PROJECTS_LIMIT) {
      const numProjects = PROJECTS_LIMIT - _projectsSelected.length;
      const additionalProjects = projectsWithOrderData.filter(
        p1 => !_projectsSelected.some(p2 => p1.id === p2.id),
      );
      _projectsSelected.push(
        ...shuffle(additionalProjects).slice(0, numProjects),
      );
    }

    return _projectsSelected;
  }, [projectsWithSellOrders, projectsWithOrderData]);

  return projectsSelected;
}
