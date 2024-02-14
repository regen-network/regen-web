import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

const PROJECTS_LIMIT = 3;

export default function useMoreProjects(projectId: string) {
  const { projectsWithOrderData, loading } = useProjectsWithOrders({
    limit: PROJECTS_LIMIT,
    random: true,
    skippedProjectId: projectId,
    enableOffchainProjectsQuery: false,
  });

  return { projectsWithOrderData, loading };
}
