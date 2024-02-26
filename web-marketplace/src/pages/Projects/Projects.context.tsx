import { useOutletContext } from 'react-router-dom';

import { Maybe, PrefinanceProjects } from 'generated/sanity-graphql';

import { ProjectWithOrderData } from './AllProjects/AllProjects.types';

type ProjectsContextType = {
  prefinanceProjects: ProjectWithOrderData[];
  prefinanceProjectsContent?: Maybe<PrefinanceProjects>;
};

export const useProjectsContext = (): ProjectsContextType => {
  return useOutletContext<ProjectsContextType>();
};
