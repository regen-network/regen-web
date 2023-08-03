import { AllSoldOutProjectsQuery } from 'generated/sanity-graphql';

type Params = {
  sanitySoldOutProjects?: AllSoldOutProjectsQuery;
};

export const useAllSoldOutProjectsIds = ({
  sanitySoldOutProjects,
}: Params): string[] => {
  const soldOutProjectsIds =
    sanitySoldOutProjects?.allSoldOutProjects?.[0]?.soldOutProjectsList?.map(
      project => String(project?.projectId),
    ) ?? [];

  return soldOutProjectsIds;
};
