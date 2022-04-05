import { useState, useEffect } from 'react';

import { Basket } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import {
  QueryClientImpl as BankQueryClient,
  QueryBalanceResponse,
  QueryDenomMetadataResponse,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import useQueryBaskets from './useQueryBaskets';
import {
  fetchBalanceByAddressAndDenom,
  fetchDenomMetadata,
} from '../lib/ecocredit';
import { useLedger } from '../ledger';

type BasketTokens = {
  basket: Basket;
  balance?: QueryBalanceResponse;
  metadata?: QueryDenomMetadataResponse;
};

export default function useBasketTokens(address?: string): BasketTokens[] {
  const { api } = useLedger();
  const [banckQueryClient, setBankQueryClient] = useState<BankQueryClient>();

  const baskets = useQueryBaskets();
  const [basketTokens, setBasketTokens] = useState<BasketTokens[]>([]);

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient = new BankQueryClient(api.queryClient);
    setBankQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!banckQueryClient || !address || !baskets) return;

    async function fetchData(
      banckQueryClient: BankQueryClient,
      address: string,
      baskets: QueryBasketsResponse,
    ): Promise<void> {
      const _basketTokens = await Promise.all(
        baskets.baskets.map(async basket => ({
          basket,
          balance: await fetchBalanceByAddressAndDenom({
            client: banckQueryClient,
            address,
            denom: basket.basketDenom,
          }),
          metadata: await fetchDenomMetadata({
            client: banckQueryClient,
            denom: basket.basketDenom,
          }),
        })),
      );

      const withPositiveBalance = (basket: BasketTokens): boolean =>
        basket.balance?.balance?.amount !== '0';

      setBasketTokens(_basketTokens.filter(withPositiveBalance));
    }

    fetchData(banckQueryClient, address, baskets);
  }, [banckQueryClient, address, baskets]);

  return basketTokens;
}
