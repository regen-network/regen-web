import { IS_REGEN } from 'lib/env';

import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

const PROJECTS_LIMIT = 3;

export default function useMoreProjects(projectId: string) {
  const { projectsWithOrderData, loading } = useProjectsWithOrders({
    limit: PROJECTS_LIMIT,
    random: true,
    skippedProjectId: projectId,
    useOffChainProjects: IS_REGEN ? false : true,
    enableOffchainProjectsQuery: IS_REGEN ? false : true,
  });
  console.log('projectsWithOrderData', projectsWithOrderData);
  return { projectsWithOrderData, loading };
}
