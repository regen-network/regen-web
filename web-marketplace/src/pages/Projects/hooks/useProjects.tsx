import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

import { PROJECTS_PER_PAGE } from '../Projects.config';
import { ProjectWithOrderData } from '../Projects.types';

type ResponseType = {
  allProjects: ProjectWithOrderData[];
  projects: ProjectWithOrderData[];
  projectsCount?: number;
  pagesCount: number;
  loading: boolean;
  hasCommunityProjects: boolean;
};

type Props = {
  sort: string;
  offset?: number;
  useCommunityProjects?: boolean;
  useOffChainProjects?: boolean;
  creditClassFilter?: Record<string, boolean>;
};

export const useProjects = ({
  offset = 0,
  sort,
  useCommunityProjects = false,
  useOffChainProjects = false,
  creditClassFilter = {},
}: Props): ResponseType => {
  // get normalized projects with sell order data
  const {
    allProjects,
    projectsWithOrderData,
    projectsCount,
    loading,
    hasCommunityProjects,
  } = useProjectsWithOrders({
    limit: PROJECTS_PER_PAGE,
    offset,
    sort,
    useCommunityProjects,
    useOffChainProjects,
    creditClassFilter,
  });

  const pagesCount = Math.ceil((projectsCount ?? 0) / PROJECTS_PER_PAGE);

  return {
    allProjects,
    projects: projectsWithOrderData,
    projectsCount,
    pagesCount,
    loading,
    hasCommunityProjects,
  };
};
