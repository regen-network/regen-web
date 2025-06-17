import { useCallback } from 'react';
import {
  QueryBasketResponse,
  QueryBasketsResponse,
} from '@regen-network/api/regen/ecocredit/basket/v1/query';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { BasketTokens, BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';
import normalizeCreditBaskets from 'lib/normalizers/creditBaskets/normalizeCreditBaskets';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';
import { BANK_BALANCE_KEY } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery.constants';
import { getDenomMetadataQuery } from 'lib/queries/react-query/cosmos/bank/getDenomMetadataQuery/getDenomMetadataQuery';
import { getBasketQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketQuery/getBasketQuery';
import { getBasketsQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketsQuery/getBasketsQuery';
import { useWallet } from 'lib/wallet/wallet';

interface Params {
  credits: BatchInfoWithBalance[];
  address?: string | null;
  hideEcocredits?: boolean;
}

interface Response {
  baskets?: QueryBasketsResponse;
  basketTokens: BasketTokens[];
  basketsWithClasses: (QueryBasketResponse | undefined)[];
  creditBaskets: (QueryBasketResponse | undefined)[][];
  reloadBasketsBalance: () => Promise<void>;
}

export const useFetchBaskets = ({
  credits,
  address,
  hideEcocredits,
}: Params): Response => {
  const { queryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();

  // Baskets
  const { data: basketsData } = useQuery(
    getBasketsQuery({
      enabled: !!queryClient && !hideEcocredits,
      client: queryClient,
      request: {},
    }),
  );
  const basketsInfo = basketsData?.basketsInfo ?? [];

  // Basket({denom})
  const basketResults = useQueries({
    queries: basketsInfo.map(basketInfo =>
      getBasketQuery({
        client: queryClient,
        request: { basketDenom: basketInfo.basketDenom },
      }),
    ),
  });
  const basketDatas = basketResults.map(basketResult => basketResult.data);

  const reqAddress = address ?? wallet?.address;
  // Balance({address, denom})
  const balanceResults = useQueries({
    queries: basketsInfo.map(basketInfo =>
      getBalanceQuery({
        enabled: !!queryClient && !!reqAddress,
        client: queryClient,
        request: {
          address: reqAddress as string,
          denom: basketInfo.basketDenom,
        },
      }),
    ),
  });
  const balanceDatas = balanceResults.map(balanceResult => balanceResult.data);

  // DenomMetadata({denom})
  const denomMetadataResults = useQueries({
    queries: basketsInfo.map(basketInfo =>
      getDenomMetadataQuery({
        client: queryClient,
        request: { denom: basketInfo.basketDenom },
      }),
    ),
  });
  const denomMetadataDatas = denomMetadataResults.map(
    denomMetadataResult => denomMetadataResult.data,
  );

  // Normalize + filter
  const basketTokens = basketsInfo
    .map((basketInfo, index) => ({
      basket: basketInfo,
      balance: balanceDatas[index] ?? void 0,
      metadata: denomMetadataDatas[index] ?? void 0,
    }))
    .filter(
      basketToken =>
        basketToken.balance &&
        Number(basketToken.balance.balance?.amount) !== 0,
    );

  const creditBaskets = normalizeCreditBaskets({
    basketsWithClasses: basketDatas,
    credits,
  });

  // Reload balances callback
  const reloadBasketsBalance = useCallback(async (): Promise<void> => {
    await reactQueryClient.invalidateQueries({
      queryKey: [BANK_BALANCE_KEY],
    });
  }, [reactQueryClient]);

  return {
    basketTokens,
    baskets: basketsData,
    basketsWithClasses: basketDatas,
    creditBaskets,
    reloadBasketsBalance,
  };
};
