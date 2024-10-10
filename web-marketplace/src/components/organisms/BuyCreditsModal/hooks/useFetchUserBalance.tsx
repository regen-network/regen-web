import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getAllBalancesQuery } from 'lib/queries/react-query/cosmos/bank/getAllBalancesQuery/getAllBalancesQuery';
import { useWallet } from 'lib/wallet/wallet';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

interface Params {
  selectedSellOrder?: UISellOrderInfo;
  askDenom?: string;
}

export const useFetchUserBalance = ({
  selectedSellOrder,
  askDenom,
}: Params): number | null => {
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
      allBalancesData?.balances.find(
        balance => balance.denom === selectedSellOrder?.askDenom || askDenom,
      )?.amount,
    [allBalancesData?.balances, selectedSellOrder?.askDenom, askDenom],
  );

  if (isLoading) {
    return null;
  }
  return userBalance ? Number(userBalance) : 0;
};
