import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

import { ProjectWithOrderData } from '../Projects.types';
import { useSortProjects } from './useSortProjects';

interface ReturnType {
  projects: ProjectWithOrderData[];
  loading: boolean;
}

export const useProjects = (sort: string): ReturnType => {
  // get normalized projects with sell order data
  const { projectsWithOrderData, loading } = useProjectsWithOrders({});

  const projects = useSortProjects({
    projects: projectsWithOrderData,
    sort,
  });

  return {
    projects,
    loading,
  };
};
