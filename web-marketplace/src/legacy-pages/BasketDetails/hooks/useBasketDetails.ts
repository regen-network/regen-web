import { BasketOverviewProps } from '../../../components/organisms';
import {
  FetchBasketEcocreditsType,
  useFetchBasketEcocredits,
} from './useFetchBasketEcocredits';
import { useFetchBasketOverview } from './useFetchBasketOverview';

interface BasketDetails extends FetchBasketEcocreditsType {
  overview?: BasketOverviewProps;
}

const useBasketDetails = (basketDenom?: string): BasketDetails => {
  const overview = useFetchBasketOverview({ basketDenom });
  const basketEcocredits = useFetchBasketEcocredits({ basketDenom });

  return { overview, ...basketEcocredits };
};

export default useBasketDetails;
