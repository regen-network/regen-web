import { useState, useEffect, useCallback } from 'react';

import { Basket } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import {
  QueryBalanceResponse,
  QueryDenomMetadataResponse,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import useQueryBalance from './useQueryBalance';
import useQueryDenomMetadata from './useQueryDenomMetadata';

export interface BasketTokens {
  basket: Basket;
  balance?: QueryBalanceResponse;
  metadata?: QueryDenomMetadataResponse;
}

export default function useBasketTokens(
  address?: string,
  baskets?: QueryBasketsResponse,
): {
  basketTokens: BasketTokens[];
  fetchBasketTokens: () => Promise<void>;
} {
  const fetchBalance = useQueryBalance();
  const fetchDenomMetadata = useQueryDenomMetadata();
  const [basketTokens, setBasketTokens] = useState<BasketTokens[]>([]);

  const fetchBasketTokens = useCallback(async (): Promise<void> => {
    if (!baskets) return;

    const _basketTokens = await Promise.all(
      baskets.baskets.map(async basket => ({
        basket,
        balance: await fetchBalance({
          address,
          denom: basket.basketDenom,
        }),
        metadata: await fetchDenomMetadata(basket.basketDenom),
      })),
    );

    const withPositiveBalance = (basket: BasketTokens): boolean =>
      basket.balance?.balance?.amount !== '0';

    setBasketTokens(_basketTokens.filter(withPositiveBalance));
  }, [baskets, address, fetchBalance, fetchDenomMetadata]);

  useEffect(() => {
    if (!address || !baskets) return;

    fetchBasketTokens();
  }, [fetchBasketTokens, baskets, address]);

  return { basketTokens, fetchBasketTokens };
}
