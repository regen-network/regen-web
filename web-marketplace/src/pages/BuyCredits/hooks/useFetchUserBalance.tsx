import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { microToDenom } from 'lib/denom.utils';
import { getAllBalancesQuery } from 'lib/queries/react-query/cosmos/bank/getAllBalancesQuery/getAllBalancesQuery';
import { useWallet } from 'lib/wallet/wallet';

export const useFetchUserBalance = (askDenom?: string) => {
  const { wallet } = useWallet();
  const { queryClient } = useLedger();
  const {
    data: allBalancesData,
    isLoading,
    isFetching,
  } = useQuery(
    getAllBalancesQuery({
      request: { address: wallet?.address as string },
      client: queryClient,
      enabled: !!queryClient && !!wallet?.address,
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
