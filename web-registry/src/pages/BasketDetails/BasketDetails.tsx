import React from 'react';
import { useParams } from 'react-router-dom';

import { BasketEcocredits, BasketOverview } from '../../components/organisms';
import { useBasketDetails } from '../../hooks';

const BasketDetails: React.FC = () => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const data = useBasketDetails(basketDenom);

  return (
    <>
      {data.overview && <BasketOverview {...data.overview} />}
      {data.creditBatches && <BasketEcocredits batches={data.creditBatches} />}
    </>
  );
};

export { BasketDetails };
