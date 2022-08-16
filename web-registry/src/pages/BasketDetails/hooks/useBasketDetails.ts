import { QueryBasketBalancesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import {
  BasketOverviewProps,
  CreditBatch,
  useBasketEcocreditsTable,
  useBasketOverview,
} from '../../../components/organisms';
import useBasketQuery from '../../../hooks/useBasketQuery';

type BasketDetails = {
  overview?: BasketOverviewProps;
  creditBatches: CreditBatch[];
};

const useBasketDetails = (basketDenom?: string): BasketDetails => {
  // shared initial data
  const { data: basketBalances } = useBasketQuery<QueryBasketBalancesResponse>({
    query: 'basketBalances',
    params: { basketDenom },
  });

  const overview = useBasketOverview(basketDenom, basketBalances);
  const creditBatches = useBasketEcocreditsTable(basketBalances);

  return { overview, creditBatches };
};

export default useBasketDetails;
