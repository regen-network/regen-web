import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';

import useEcocreditsByProject from 'hooks/useEcocreditsByProject';

type Props = {
  projectId: string;
};

type ReponseType = {
  isSellFlowDisabled: boolean;
  credits: BatchInfoWithBalance[];
};

export const useCreateSellOrderData = ({ projectId }: Props): ReponseType => {
  const { wallet } = useLedger();

  const { credits, isLoadingCredits } = useEcocreditsByProject({
    address: wallet?.address,
    projectId,
    widthAdditionalData: false,
  });

  const isSellFlowDisabled =
    (isLoadingCredits || credits.length === 0) && Boolean(wallet?.address);

  return {
    isSellFlowDisabled,
    credits,
  };
};
