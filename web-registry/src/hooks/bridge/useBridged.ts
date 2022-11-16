import { useEffect, useState } from 'react';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

// TODO - this hook is a placeholder that right now just simulates a request to
// the network and an empty response. Use later to implement the data request.

async function stall(stallTime = 3000): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

interface Props {
  address?: string;
  paginationParams?: TablePaginationParams;
}

interface Output {
  credits: BatchInfoWithBalance[];
  isLoadingCredits: boolean;
}

export const useBridged = ({ address, paginationParams }: Props): Output => {
  const [credits, setCredits] = useState<BatchInfoWithBalance[]>([]);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);

  useEffect(() => {
    stall().then(() => {
      setCredits([]);
      setIsLoadingCredits(false);
    });
  }, []);

  return { credits, isLoadingCredits };
};
