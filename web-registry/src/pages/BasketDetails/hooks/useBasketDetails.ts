import {
  BasketOverviewProps,
  CreditBatch,
  useBasketEcocreditsTable,
} from '../../../components/organisms';
import { useFetchBasketOverview } from './useFetchBasketOverview';

type BasketDetails = {
  overview?: BasketOverviewProps;
  creditBatches: CreditBatch[];
};

const useBasketDetails = (basketDenom?: string): BasketDetails => {
  const overview = useFetchBasketOverview({ basketDenom });
  // const creditBatches = useBasketEcocreditsTable(basketBalancesData);

  return { overview, creditBatches: [] };
};

export default useBasketDetails;
