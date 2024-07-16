import { ProjectWithOrderData } from '../AllProjects/AllProjects.types';

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
