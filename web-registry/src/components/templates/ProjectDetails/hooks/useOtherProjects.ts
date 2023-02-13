import { useMoreProjectsQuery } from '../../../../generated/graphql';

// TODO - just offchain projects, missing onchain

export default function useOtherProjects(projectId: string) {
  const { data: projectsData } = useMoreProjectsQuery();
  const allProjects = projectsData?.allProjects?.nodes;
  const otherProjects = allProjects?.filter(
    project => !!project?.handle && project.handle !== projectId,
  );
  return otherProjects;
}
