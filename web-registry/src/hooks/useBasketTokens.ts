import { useState, useEffect } from 'react';

import { Basket } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import {
  QueryBalanceResponse,
  QueryDenomMetadataResponse,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import useQueryBaskets from './useQueryBaskets';
import useQueryBalance from './useQueryBalance';
import useQueryDenomMetadata from './useQueryDenomMetadata';

export interface BasketTokens {
  basket: Basket;
  balance?: QueryBalanceResponse;
  metadata?: QueryDenomMetadataResponse;
}

export default function useBasketTokens(address?: string): BasketTokens[] {
  const baskets = useQueryBaskets();
  const fetchBalance = useQueryBalance();
  const fetchDenomMetadata = useQueryDenomMetadata();
  const [basketTokens, setBasketTokens] = useState<BasketTokens[]>([]);

  useEffect(() => {
    if (!address || !baskets) return;

    async function fetchData(baskets: QueryBasketsResponse): Promise<void> {
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

      setBasketTokens(_basketTokens);
    }

    fetchData(baskets);
  }, [address, baskets, fetchBalance]);

  return basketTokens;
}
