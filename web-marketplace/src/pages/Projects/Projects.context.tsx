import { useOutletContext } from 'react-router-dom';

import { Maybe, PrefinanceProjects } from 'generated/sanity-graphql';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { ProjectWithOrderData } from './AllProjects/AllProjects.types';

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
};

export const useProjectsContext = (): ProjectsContextType => {
  return useOutletContext<ProjectsContextType>();
};
