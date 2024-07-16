import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

import { PROJECTS_PER_PAGE } from '../AllProjects/AllProjects.config';

type Props = {
  sort: string;
  offset?: number;
  useCommunityProjects?: boolean;
  creditClassFilter?: Record<string, boolean>;
  sortPinnedIds?: string[]; // list of on-chain id, uuid or slug to pinned at the top if `sort` set to 'featured-projects';
};

export const useProjects = ({
  offset = 0,
  sort,
  useCommunityProjects = false,
  creditClassFilter = {},
  sortPinnedIds,
}: Props) => {
  // get normalized projects with sell order data
  const {
    allProjects,
    haveOffChainProjects,
    projectsWithOrderData,
    projectsCount,
    loading,
    hasCommunityProjects,
    prefinanceProjectsCount,
    prefinanceProjects,
  } = useProjectsWithOrders({
    limit: PROJECTS_PER_PAGE,
    offset,
    sort,
    useCommunityProjects,
    creditClassFilter,
    sortPinnedIds,
  });

  const pagesCount = Math.ceil((projectsCount ?? 0) / PROJECTS_PER_PAGE);

  return {
    allProjects,
    haveOffChainProjects,
    projects: projectsWithOrderData,
    projectsCount,
    pagesCount,
    loading,
    hasCommunityProjects,
    prefinanceProjectsCount,
    prefinanceProjects,
  };
};
