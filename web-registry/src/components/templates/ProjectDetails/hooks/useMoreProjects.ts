import { useRef } from 'react';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

const PROJECTS_LIMIT = 3;

export default function useMoreProjects(
  projectId: string,
): ProjectWithOrderData[] {
  const projectsRef = useRef<ProjectWithOrderData[]>([]);
  const { projectsWithOrderData } = useProjectsWithOrders({
    limit: PROJECTS_LIMIT,
    random: true,
    projectId,
  });

  if (projectsRef.current.length === 0 && projectsWithOrderData.length > 0) {
    projectsRef.current = projectsWithOrderData;
  }

  return projectsRef.current;
}
