import { ProjectWithOrderData } from '../AllProjects.types';

type Params = {
  project?: ProjectWithOrderData;
  soldOutProjectsIds: string[];
};

export const getIsSoldOut = ({
  project,
  soldOutProjectsIds,
}: Params): boolean => {
  return (
    project?.purchaseInfo?.sellInfo?.creditsAvailable === 0 &&
    soldOutProjectsIds.includes(project?.id)
  );
};
