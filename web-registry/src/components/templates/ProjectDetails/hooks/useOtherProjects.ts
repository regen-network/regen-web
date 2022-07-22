import { useMoreProjectsQuery } from '../../../../generated/graphql';

// TODO - just offchain projects, missing onchain

export default function useOtherProjects(projectId: string) {
  const { data: projectsData } = useMoreProjectsQuery();
  const allProjects = projectsData?.allProjects?.nodes;
  return allProjects?.filter(p => p?.handle !== projectId);
}
