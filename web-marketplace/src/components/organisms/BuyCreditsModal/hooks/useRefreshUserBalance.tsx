import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { BANK_ALL_BALANCES_KEY } from 'lib/queries/react-query/cosmos/bank/getAllBalancesQuery/getAllBalancesQuery.constants';
import { useWallet } from 'lib/wallet/wallet';

interface Params {
  open: boolean;
}

export const useRefreshUserBalance = ({ open }: Params): void => {
  const queryClient = useQueryClient();
  const { wallet } = useWallet();
  useEffect(() => {
    if (open) {
      // Refresh user balance on modal opening
      queryClient.invalidateQueries([BANK_ALL_BALANCES_KEY, wallet?.address]);
    }
  }, [open, wallet?.address, queryClient]);
};
