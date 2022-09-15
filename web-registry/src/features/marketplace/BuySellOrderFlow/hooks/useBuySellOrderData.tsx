import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from 'ledger';

import { useProjectsSellOrders } from 'pages/Projects/hooks/useProjectsSellOrders';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { useQuerySellOrders } from 'hooks/useQuerySellOrders';

type Props = {
  projects?: ProjectInfo[];
};

type ReponseType = {
  isBuyFlowDisabled: boolean;
  projectsWithOrderData: ProjectWithOrderData[];
};

export const useBuySellOrderData = ({ projects }: Props): ReponseType => {
  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;
  const { wallet } = useLedger();

  const { projectsWithOrderData, loading: loadingProjects } =
    useProjectsSellOrders({
      projects,
      sellOrders,
    });

  const isBuyFlowDisabled =
    (loadingProjects || projectsWithOrderData[0]?.sellOrders.length === 0) &&
    Boolean(wallet?.address);

  return {
    isBuyFlowDisabled,
    projectsWithOrderData,
  };
};
