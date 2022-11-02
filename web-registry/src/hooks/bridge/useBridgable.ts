import { useEffect, useState } from 'react';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import useEcocredits from 'hooks/useEcocredits';

interface Props {
  address?: string;
  paginationParams?: TablePaginationParams;
}

interface Output {
  bridgableCredits: BatchInfoWithBalance[];
  isLoadingCredits: boolean;
}

export const useBridgable = ({ address, paginationParams }: Props): Output => {
  const [bridgableCredits, setBridgableCredits] = useState<
    BatchInfoWithBalance[]
  >([]);
  const { credits, isLoadingCredits } = useEcocredits({
    address,
    paginationParams,
  });

  useEffect(() => {
    if (isLoadingCredits) return;
    const _bridgableCredits = credits.filter(
      credit =>
        credit.classId === 'C01' && Number(credit.balance?.tradableAmount) > 0, //TODO: CO3
    );
    setBridgableCredits(_bridgableCredits);
  }, [credits, isLoadingCredits]);

  return { bridgableCredits, isLoadingCredits };
};
