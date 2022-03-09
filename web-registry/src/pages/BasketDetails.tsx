import React from 'react';
import { useParams } from 'react-router-dom';

import useBasketDetails from '../hooks/useBasketDetails';
import { BasketOverview, BasketEcocredits } from '../components/organisms';

const BasketDetails: React.FC = () => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const { dataOverview, dataBasketBatches } = useBasketDetails(basketDenom);

  return (
    <>
      {dataOverview && <BasketOverview {...dataOverview} />}
      {dataBasketBatches && <BasketEcocredits batches={dataBasketBatches} />}
    </>
  );
};

export { BasketDetails };
