import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

import { PROJECTS_PER_PAGE } from '../Projects.config';
import { ProjectWithOrderData } from '../Projects.types';

interface ReturnType {
  projects: ProjectWithOrderData[];
  projectsCount?: number;
  pagesCount: number;
  loading: boolean;
}

interface Props {
  sort: string;
  offset?: number;
}

export const useProjects = ({ offset = 0, sort }: Props): ReturnType => {
  // get normalized projects with sell order data
  const { projectsWithOrderData, projectsCount, loading } =
    useProjectsWithOrders({
      limit: PROJECTS_PER_PAGE,
      offset,
      sort,
    });

  const pagesCount = Math.ceil((projectsCount ?? 0) / PROJECTS_PER_PAGE);

  return {
    projects: projectsWithOrderData,
    projectsCount,
    pagesCount,
    loading,
  };
};
