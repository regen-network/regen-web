import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

type Props = {
  projectId?: string;
  classId?: string;
  isOffChainProject?: boolean;
  projectSlugOrId?: string;
};

type ResponseType = {
  isBuyFlowDisabled: boolean;
  projectsWithOrderData: NormalizeProject[];
  loadingBuySellOrders: boolean;
};

export const useBuySellOrderData = ({
  projectId,
  classId,
  isOffChainProject = false,
  projectSlugOrId,
}: Props): ResponseType => {
  const { projectsWithOrderData, loading: loadingProjects } =
    useProjectsWithOrders({
      projectId,
      classId,
      enableOffchainProjectsQuery: !projectSlugOrId,
      showCommunityProjects: true,
      isOffChainProject,
      projectSlugOrId,
    });

  const isBuyFlowDisabled =
    loadingProjects ||
    projectsWithOrderData?.length === 0 ||
    projectsWithOrderData[0]?.filteredSellOrders?.length === 0;

  return {
    loadingBuySellOrders: loadingProjects,
    isBuyFlowDisabled,
    projectsWithOrderData,
  };
};
