import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getAllBalancesQuery } from 'lib/queries/react-query/cosmos/bank/getAllBalancesQuery/getAllBalancesQuery';
import { useWallet } from 'lib/wallet/wallet';

export const useFetchUserBalance = (
  askDenom?: string,
): {
  isLoading: boolean;
  userBalance: number;
} => {
  const { wallet } = useWallet();
  const { bankClient } = useLedger();
  const { data: allBalancesData, isLoading } = useQuery(
    getAllBalancesQuery({
      request: { address: wallet?.address },
      client: bankClient,
      enabled: !!bankClient && !!wallet?.address,
    }),
  );

  const userBalance = useMemo(
    () =>
      allBalancesData?.balances.find(balance => balance.denom === askDenom)
        ?.amount,
    [allBalancesData?.balances, askDenom],
  );

  return {
    isLoading,
    userBalance: userBalance ? Number(userBalance) : 0,
  };
};
