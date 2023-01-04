import { useParams } from 'react-router-dom';
import { BasketInfo } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { useQuery } from '@tanstack/react-query';

import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';
import { getBasketQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketQuery/getBasketQuery';
import { getBalancesQuery } from 'lib/queries/react-query/ecocredit/getBalancesQuery/getBalancesQuery';
import { useWallet } from 'lib/wallet/wallet';

import { useBasketDetailStore } from 'pages/BasketDetails/BasketDetails.context';

import { useFetchEcocredit } from './useFetchEcocredit';

export type BasketPutData = {
  basketOption: Option;
  basketInfo?: BasketInfo;
  creditBatchDenoms: string[];
  credit: BatchInfoWithBalance;
  isLoadingData: boolean;
  totalTradableCredits: number;
};

export const useBasketPutData = (): BasketPutData => {
  const { ecocreditClient, basketClient } = useLedger();
  const { wallet } = useWallet();
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const [creditBatchDenom] = useBasketDetailStore(
    store => store.creditBatchDenom,
  );

  const { credit } = useFetchEcocredit({ batchDenom: creditBatchDenom });

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
    credit,
    basketInfo: basketData?.basketInfo,
    basketOption: {
      label: basketData?.basketInfo?.name ?? '',
      value: basketDenom ?? '',
    },
    creditBatchDenoms: creditBatchDenoms ?? [],
    isLoadingData,
    totalTradableCredits,
  };
};
