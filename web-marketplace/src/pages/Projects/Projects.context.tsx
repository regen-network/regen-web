import { useOutletContext } from 'react-router-dom';

import { Maybe, PrefinanceProjects } from 'generated/sanity-graphql';

import { ProjectWithOrderData } from './AllProjects/AllProjects.types';

type ProjectsContextType = {
  allProjects: ProjectWithOrderData[];
  prefinanceProjects: ProjectWithOrderData[];
  projects: ProjectWithOrderData[];
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
