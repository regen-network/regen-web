import { useParams } from 'react-router-dom';
import { BasketDetails } from 'legacy-pages/BasketDetails/BasketDetails';
import { NotFoundPage } from 'legacy-pages/NotFound/NotFound';

import { BRIDGE_BASKET_DENOM } from 'lib/env';

const DeprecatedBasketDetails = (): JSX.Element => {
  const { basketDenom } = useParams<{ basketDenom?: string }>();
  if (!BRIDGE_BASKET_DENOM || basketDenom !== BRIDGE_BASKET_DENOM) {
    return <NotFoundPage />;
  }

  return <BasketDetails />;
};

export { DeprecatedBasketDetails };
