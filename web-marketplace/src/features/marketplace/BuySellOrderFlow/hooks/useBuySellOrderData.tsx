import { useWallet } from 'lib/wallet/wallet';

import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

type Props = {
  projectId?: string;
  classId?: string;
};

type ReponseType = {
  isBuyFlowDisabled: boolean;
  projectsWithOrderData: ProjectWithOrderData[];
  loadingBuySellOrders: boolean;
};

export const useBuySellOrderData = ({
  projectId,
  classId,
}: Props): ReponseType => {
  const { wallet } = useWallet();

  const { projectsWithOrderData, loading: loadingProjects } =
    useProjectsWithOrders({
      projectId,
      classId,
      enableOffchainProjectsQuery: false,
    });

  const sellOrdersAvailable = projectsWithOrderData[0]?.sellOrders.filter(
    sellOrder => sellOrder.seller !== wallet?.address,
  );

  const isBuyFlowDisabled =
    loadingProjects ||
    projectsWithOrderData?.length === 0 ||
    sellOrdersAvailable?.length === 0;

  return {
    loadingBuySellOrders: loadingProjects,
    isBuyFlowDisabled,
    projectsWithOrderData,
  };
};
