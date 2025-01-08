import { Project } from 'generated/sanity-graphql';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import {
  ProjectWithOrderData,
  UISellOrderInfo,
} from '../AllProjects/AllProjects.types';

export interface ProjectsSellOrders {
  allProjects: ProjectWithOrderData[];
  allOnChainProjects: ProjectWithOrderData[];
  prefinanceProjects: NormalizeProject[];
  projectsWithOrderData: NormalizeProject[];
  projectsCount?: number;
  loading: boolean;
  hasCommunityProjects: boolean;
  haveOffChainProjects: boolean;
  prefinanceProjectsCount?: number;
  sellOrders?: UISellOrderInfo[];
  sanityProjects?: Array<Pick<Project, 'fiatSellOrders'>>;
}
