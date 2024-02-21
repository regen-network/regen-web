import { ProjectWithOrderData } from '../AllProjects.types';

export interface ProjectsSellOrders {
  allProjects: ProjectWithOrderData[];
  prefinanceProjects: ProjectWithOrderData[];
  projectsWithOrderData: ProjectWithOrderData[];
  projectsCount?: number;
  loading: boolean;
  hasCommunityProjects: boolean;
  haveOffChainProjects: boolean;
  prefinanceProjectsCount?: number;
}
