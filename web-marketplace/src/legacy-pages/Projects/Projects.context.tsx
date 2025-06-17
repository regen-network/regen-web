import { useOutletContext } from 'react-router-dom';

import type { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { Maybe, PrefinanceProjects } from 'generated/sanity-graphql';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import {
  CreditClassFilter,
  ProjectWithOrderData,
} from './AllProjects/AllProjects.types';

type ProjectsContextType = {
  allProjects: ProjectWithOrderData[];
  allOnChainProjects: ProjectWithOrderData[];
  prefinanceProjects: NormalizeProject[];
  projects: NormalizeProject[];
  projectsCount?: number;
  loading: boolean;
  hasCommunityProjects: boolean;
  haveOffChainProjects: boolean;
  prefinanceProjectsCount?: number;
  prefinanceProjectsContent?: Maybe<PrefinanceProjects>;
  pagesCount: number;
  soldOutProjectsIds: string[];
  creditClassFilterOptions: CreditClassFilter[];
  buyingOptionsFilterOptions: FilterOption[];
};

export const useProjectsContext = (): ProjectsContextType => {
  return useOutletContext<ProjectsContextType>();
};
