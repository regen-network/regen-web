import { ProjectWithOrderData } from '../Projects.types';

export interface ProjectsSellOrders {
  allProjects: ProjectWithOrderData[];
  projectsWithOrderData: ProjectWithOrderData[];
  projectsCount?: number;
  loading: boolean;
  hasCommunityProjects: boolean;
}
