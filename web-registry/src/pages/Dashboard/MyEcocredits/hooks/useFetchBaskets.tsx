import { useCallback } from 'react';
import {
  QueryBasketResponse,
  QueryBasketsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getBalanceQuery } from 'lib/queries/react-query/bank/getBalanceQuery/getBalanceQuery';
import { BANK_BALANCE_KEY } from 'lib/queries/react-query/bank/getBalanceQuery/getBalanceQuery.constants';
import { getDenomMetadataQuery } from 'lib/queries/react-query/bank/getDenomMetadataQuery/getDenomMetadataQuery';
import { getBasketQuery } from 'lib/queries/react-query/basket/getBasketQuery/getBasketQuery';
import { getBasketsQuery } from 'lib/queries/react-query/basket/getBasketsQuery/getBasketsQuery';
import { useWallet } from 'lib/wallet/wallet';

import { BasketTokens } from 'hooks/useBasketTokens';

interface Response {
  baskets?: QueryBasketsResponse;
  basketTokens: BasketTokens[];
  basketsWithClasses: (QueryBasketResponse | undefined)[];
  reloadBasketsBalance: () => Promise<void>;
}

export const useFetchBaskets = (): Response => {
  const { basketClient, bankClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();

  // 1.  Baskets
  const { data: basketsData } = useQuery(
    getBasketsQuery({
      enabled: !!basketClient,
      client: basketClient,
      request: {},
    }),
  );
  const basketsInfo = basketsData?.basketsInfo ?? [];

  // 2.  Basket({denom})
  const basketResults = useQueries({
    queries: basketsInfo.map(basketInfo =>
      getBasketQuery({
        client: basketClient,
        request: { basketDenom: basketInfo.basketDenom },
      }),
    ),
  });
  const basketDatas = basketResults.map(basketResult => basketResult.data);

  // 3.  Balance({address, denom})
  const balanceResults = useQueries({
    queries: basketsInfo.map(basketInfo =>
      getBalanceQuery({
        client: bankClient,
        request: { address: wallet?.address, denom: basketInfo.basketDenom },
      }),
    ),
  });
  const balanceDatas = balanceResults.map(balanceResult => balanceResult.data);

  // 4.  DenomMetadata({denom})
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

  // 5.  Normalize + filter
  const basketTokens = basketsInfo
    .map((basketInfo, index) => ({
      basket: basketInfo,
      balance: balanceDatas[index],
      metadata: denomMetadataDatas[index],
    }))
    .filter(
      basketToken =>
        basketToken.balance && basketToken.balance?.balance?.amount !== '0',
    );

  // 6.  Reload balances callback
  const reloadBasketsBalance = useCallback(async (): Promise<void> => {
    await reactQueryClient.invalidateQueries({
      queryKey: [BANK_BALANCE_KEY],
    });
  }, [reactQueryClient]);

  return {
    basketTokens,
    baskets: basketsData,
    basketsWithClasses: basketDatas,
    reloadBasketsBalance,
  };
};
