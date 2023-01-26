import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';

import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

type Props = {
  projectId: string;
};

type ReponseType = {
  isSellFlowDisabled: boolean;
  credits: BatchInfoWithBalance[];
};

export const useCreateSellOrderData = ({ projectId }: Props): ReponseType => {
  const { wallet } = useLedger();

  const { credits, isLoadingCredits } = useFetchEcocredits({});
  const creditsForProject = credits?.filter(
    credit => credit.projectId === projectId,
  );

  const tradableCredits = creditsForProject.filter(
    credit => Number(credit.balance?.tradableAmount) > 0,
  );

  const hasTradeableCredits = tradableCredits.length > 0;

  const isSellFlowDisabled =
    (isLoadingCredits || !hasTradeableCredits) && Boolean(wallet?.address);

  return {
    isSellFlowDisabled,
    credits: tradableCredits,
  };
};
