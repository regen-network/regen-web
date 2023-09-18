import { ProjectWithOrderData } from '../Projects.types';

export interface ProjectsSellOrders {
  projectsWithOrderData: ProjectWithOrderData[];
  projectsCount?: number;
  loading: boolean;
  hasCommunityProjects: boolean;
}
