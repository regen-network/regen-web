import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

import { PROJECTS_PER_PAGE } from '../AllProjects/AllProjects.config';

type Props = {
  sort: string;
  offset?: number;
  useCommunityProjects?: boolean;
  creditClassFilter?: Record<string, boolean>;
  sortPinnedIds?: string[]; // list of on-chain id, uuid or slug to pinned at the top if `sort` set to 'featured-projects';
  regionFilter?: Record<string, boolean>;
  environmentTypeFilter?: Record<string, boolean>;
  marketTypeFilter?: Record<string, boolean>;
};

export const useProjects = ({
  offset = 0,
  sort,
  useCommunityProjects = false,
  creditClassFilter = {},
  sortPinnedIds,
  regionFilter,
  environmentTypeFilter,
  marketTypeFilter,
}: Props) => {
  // get normalized projects with sell order data
  const {
    allProjects,
    allOnChainProjects,
    haveOffChainProjects,
    projectsWithOrderData,
    projectsCount,
    loading,
    hasCommunityProjects,
    prefinanceProjectsCount,
    prefinanceProjects,
    filteredSellOrders,
    sanityProjects,
  } = useProjectsWithOrders({
    limit: PROJECTS_PER_PAGE,
    offset,
    sort,
    useCommunityProjects,
    creditClassFilter,
    sortPinnedIds,
    regionFilter,
    environmentTypeFilter,
    marketTypeFilter,
  });

  const pagesCount = Math.ceil((projectsCount ?? 0) / PROJECTS_PER_PAGE);

  return {
    allProjects,
    allOnChainProjects,
    haveOffChainProjects,
    projects: projectsWithOrderData,
    projectsCount,
    pagesCount,
    loading,
    hasCommunityProjects,
    prefinanceProjectsCount,
    prefinanceProjects,
    filteredSellOrders,
    sanityProjects,
  };
};
