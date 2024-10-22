import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

type Props = {
  projectId: string;
};

type ResponseType = {
  isSellFlowDisabled: boolean;
  credits: BatchInfoWithBalance[];
};

export const useCreateSellOrderData = ({ projectId }: Props): ResponseType => {
  const { credits, isLoadingCredits } = useFetchEcocredits({});
  const creditsForProject = credits?.filter(
    credit => credit.projectId === projectId,
  );

  const tradableCredits = creditsForProject.filter(
    credit => Number(credit.balance?.tradableAmount) > 0,
  );

  const hasTradeableCredits = tradableCredits.length > 0;

  const isSellFlowDisabled = isLoadingCredits || !hasTradeableCredits;

  return {
    isSellFlowDisabled,
    credits: tradableCredits,
  };
};
