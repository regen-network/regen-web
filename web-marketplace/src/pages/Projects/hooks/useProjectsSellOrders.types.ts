import { Project } from 'generated/sanity-graphql';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { ProjectWithOrderData } from '../AllProjects/AllProjects.types';

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
  sellOrders?: SellOrderInfoExtented[];
  sanityProjects?: Array<Pick<Project, 'fiatSellOrders'>>;
}
