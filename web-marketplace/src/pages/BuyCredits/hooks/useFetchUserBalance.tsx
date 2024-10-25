import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { microToDenom } from 'lib/denom.utils';
import { getAllBalancesQuery } from 'lib/queries/react-query/cosmos/bank/getAllBalancesQuery/getAllBalancesQuery';
import { useWallet } from 'lib/wallet/wallet';

export const useFetchUserBalance = (
  askDenom?: string,
): {
  isLoading: boolean;
  userBalance: number;
  microUserBalance: number;
} => {
  const { wallet } = useWallet();
  const { bankClient } = useLedger();
  const {
    data: allBalancesData,
    isLoading,
    isFetching,
  } = useQuery(
    getAllBalancesQuery({
      request: { address: wallet?.address },
      client: bankClient,
      enabled: !!bankClient && !!wallet?.address,
    }),
  );

  const microUserBalance = useMemo(
    () =>
      allBalancesData?.balances.find(balance => balance.denom === askDenom)
        ?.amount,
    [allBalancesData?.balances, askDenom],
  );

  return {
    isLoading: wallet?.address ? isLoading || isFetching : false,
    userBalance: microUserBalance ? microToDenom(microUserBalance) : 0,
    microUserBalance: microUserBalance ? Number(microUserBalance) : 0,
  };
};
