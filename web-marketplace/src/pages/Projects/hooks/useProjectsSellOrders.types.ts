import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { ProjectWithOrderData } from '../AllProjects/AllProjects.types';

export interface ProjectsSellOrders {
  allProjects: ProjectWithOrderData[];
  prefinanceProjects: NormalizeProject[];
  projectsWithOrderData: NormalizeProject[];
  projectsCount?: number;
  loading: boolean;
  hasCommunityProjects: boolean;
  haveOffChainProjects: boolean;
  prefinanceProjectsCount?: number;
}
