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
    creditClassId: process.env.REACT_APP_BRIDGE_CREDIT_CLASS_ID,
    paginationParams,
  });

  useEffect(() => {
    if (isLoadingCredits) return;

    setBridgableCredits(credits);
  }, [credits, isLoadingCredits]);

  return { bridgableCredits, isLoadingCredits };
};
