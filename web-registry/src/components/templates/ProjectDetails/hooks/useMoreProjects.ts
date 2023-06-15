import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

const PROJECTS_LIMIT = 3;

export default function useMoreProjects(
  projectId: string,
): ProjectWithOrderData[] {
  const { projectsWithOrderData } = useProjectsWithOrders({
    limit: PROJECTS_LIMIT,
    random: true,
    skippedProjectId: projectId,
  });

  return projectsWithOrderData;
}
