import { useState, useEffect } from 'react';

import { Basket } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryBalanceResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import useQueryBaskets from './useQueryBaskets';
import useQueryBalance from './useQueryBalance';

export interface BasketTokens {
  basket: Basket;
  balance?: QueryBalanceResponse | undefined;
  displayDenom: string;
}

export default function useBasketTokens(
  address: string | undefined,
): BasketTokens[] {
  const baskets = useQueryBaskets();
  const fetchBalance = useQueryBalance();
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
          // TODO: fetch display denom for basket
          displayDenom: basket.basketDenom,
        })),
      );

      setBasketTokens(_basketTokens);
    }

    fetchData(baskets);
  }, [address, baskets, fetchBalance]);

  return basketTokens;
}
