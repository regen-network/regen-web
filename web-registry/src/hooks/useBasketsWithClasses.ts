import { useState, useEffect } from 'react';

import {
  QueryBasketsResponse,
  QueryBasketResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import useQueryBasket from './useQueryBasket';

export default function useBasketsWithClasses(
  baskets?: QueryBasketsResponse,
): (QueryBasketResponse | undefined)[] {
  const { fetchBasket } = useQueryBasket();
  const [basketWithClasses, setBasketWithClasses] = useState<
    (QueryBasketResponse | undefined)[]
  >([]);

  useEffect(() => {
    if (!baskets) return;

    async function fetchData(baskets: QueryBasketsResponse): Promise<void> {
      const _baskets = await Promise.all(
        baskets.baskets.map(
          async ({ basketDenom }) => await fetchBasket({ basketDenom }),
        ),
      );

      setBasketWithClasses(_baskets);
    }

    fetchData(baskets);
  }, [fetchBasket, baskets]);

  return basketWithClasses;
}
