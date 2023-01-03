import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import { useLedger } from 'ledger';
import { getBasketQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketQuery/getBasketQuery';
import { getBalancesQuery } from 'lib/queries/react-query/ecocredit/getBalancesQuery/getBalancesQuery';
import { useWallet } from 'lib/wallet/wallet';

export type BasketPutData = {
  basketOption: Option;
  creditBatchDenoms: string[];
  isLoadingData: boolean;
  totalTradableCredits: number;
};

export const useBasketPutData = (): BasketPutData => {
  const { ecocreditClient, basketClient } = useLedger();
  const { wallet } = useWallet();
  const { basketDenom } = useParams<{ basketDenom: string }>();

  const { data: balancesData, isLoading: isLoadingBalances } = useQuery(
    getBalancesQuery({
      enabled: !!ecocreditClient,
      client: ecocreditClient,
      request: {
        address: wallet?.address,
      },
    }),
  );

  const { data: basketData, isLoading: isLoadingBasket } = useQuery(
    getBasketQuery({
      enabled: !!basketClient,
      client: basketClient,
      request: { basketDenom: basketDenom },
    }),
  );

  const creditsPutable = balancesData?.balances.filter(balance =>
    basketData?.classes.some(projectClass =>
      balance.batchDenom.startsWith(projectClass),
    ),
  );

  const creditBatchDenoms = creditsPutable?.map(credit => credit.batchDenom);
  const totalTradableCredits =
    creditsPutable?.reduce(
      (acc, credit) => Number(credit.tradableAmount) + acc,
      0,
    ) ?? 0;
  const isLoadingData = isLoadingBalances || isLoadingBasket;

  return {
    basketOption: {
      label: basketData?.basketInfo?.name ?? '',
      value: basketDenom ?? '',
    },
    creditBatchDenoms: creditBatchDenoms ?? [],
    isLoadingData,
    totalTradableCredits,
  };
};
