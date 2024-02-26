import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

import { FEATURE_PROJECTS_COUNT, PROJECTS_SORT } from '../Home.constants';

type Props = {
  pinnedIds?: string[];
};

export function useFeaturedProjects({ pinnedIds }: Props): {
  featuredProjects: ProjectWithOrderData[];
  loading: boolean;
} {
  // get normalized projects with sell order data
  const { projectsWithOrderData, loading } = useProjectsWithOrders({
    limit: FEATURE_PROJECTS_COUNT,
    metadata: true, // to discard projects without metadata prop
    sort: PROJECTS_SORT,
    pinnedIds,
    useOffChainProjects: true,
  });
  return {
    featuredProjects: projectsWithOrderData,
    loading,
  };
}
