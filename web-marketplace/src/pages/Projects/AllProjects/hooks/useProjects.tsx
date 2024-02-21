import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

import { PROJECTS_PER_PAGE } from '../AllProjects.config';

type Props = {
  sort: string;
  offset?: number;
  useCommunityProjects?: boolean;
  creditClassFilter?: Record<string, boolean>;
};

export const useProjects = ({
  offset = 0,
  sort,
  useCommunityProjects = false,
  creditClassFilter = {},
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
  } = useProjectsWithOrders({
    limit: PROJECTS_PER_PAGE,
    offset,
    sort,
    useCommunityProjects,
    creditClassFilter,
    separatePrefinanceProjects: true,
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
  };
};
