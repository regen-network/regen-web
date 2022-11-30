import { useQueries, useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getBalanceQuery } from 'lib/queries/react-query/bank/getBalanceQuery/getBalanceQuery';
import { getDenomMetadataQuery } from 'lib/queries/react-query/bank/getDenomMetadataQuery/getDenomMetadataQuery';
import { getBasketsQuery } from 'lib/queries/react-query/basket/getBasketsQuery/getBasketsQuery';
import { useWallet } from 'lib/wallet/wallet';

import { BasketTokens } from 'hooks/useBasketTokens';

interface Response {
  basketTokens: BasketTokens[];
}

export const useFetchEcocredits = (): Response => {
  const { basketClient, bankClient } = useLedger();
  const { wallet } = useWallet();

  // 1.  Baskets
  const { data: basketsData } = useQuery(
    getBasketsQuery({
      client: basketClient,
      request: {},
    }),
  );
  const basketsInfo = basketsData?.basketsInfo ?? [];

  // 2.  useQueries(Balance({address, denom})
  const balanceResults = useQueries({
    queries: basketsInfo.map(basketInfo =>
      getBalanceQuery({
        client: bankClient,
        request: { address: wallet?.address, denom: basketInfo.basketDenom },
      }),
    ),
  });
  const balanceDatas = balanceResults.map(balanceResult => balanceResult.data);

  // 3.  useQueries(DenomMetadata({denom}))
  const denomMetadataResults = useQueries({
    queries: basketsInfo.map(basketInfo =>
      getDenomMetadataQuery({
        client: bankClient,
        request: { denom: basketInfo.basketDenom },
      }),
    ),
  });
  const denomMetadataDatas = denomMetadataResults.map(
    denomMetadataResult => denomMetadataResult.data,
  );

  // 4.  Normalize + filter withPositiveBalance
  const basketTokens = basketsInfo.map((basketInfo, index) => ({
    basket: basketInfo,
    balance: balanceDatas[index],
    metadata: denomMetadataDatas[index],
  }));

  return { basketTokens };
};
