import { Account } from 'web-components/src/components/user/UserInfo';

import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

const PROJECTS_LIMIT = 3;

export default function useMoreProjects(
  projectId: string,
  projectAdmin?: Account,
) {
  const { projectsWithOrderData, loading } = useProjectsWithOrders({
    limit: PROJECTS_LIMIT,
    random: true,
    skippedProjectId: projectId,
    useOffChainProjects: true,
    projectAdmin,
  });
  return { projectsWithOrderData, loading };
}
