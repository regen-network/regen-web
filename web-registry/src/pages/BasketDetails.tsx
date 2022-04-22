import React from 'react';
import { useParams } from 'react-router-dom';

import { useBasketDetails } from '../hooks';
// import { BasketOverview, BasketEcocredits } from '../components/organisms';

const BasketDetails: React.FC = () => {
  // // eslint-disable-next-line no-console
  // console.log('*** <BasketDetails />');

  const { basketDenom } = useParams<{ basketDenom: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useBasketDetails(basketDenom);

  // eslint-disable-next-line no-console
  // console.log('*** data', data);

  return <>Hello</>;

  // return (
  //   <>
  //     {data.overview && <BasketOverview {...data.overview} />}
  //     {data.creditBatches && <BasketEcocredits batches={data.creditBatches} />}
  //   </>
  // );
};

export { BasketDetails };
