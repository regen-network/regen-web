import React from 'react';
import { useParams } from 'react-router-dom';

import { useBasketDetails } from '../hooks';
import {
  BasketOverview,
  // BasketEcocredits
} from '../components/organisms';

const BasketDetails: React.FC = () => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const data = useBasketDetails(basketDenom);

  return (
    <>
      <BasketOverview
        name={data?.basket?.basket?.name || '-'}
        displayDenom={data?.metadata?.metadata?.display || '-'}
        description={data?.metadata?.metadata?.description || '-'}
        // TODO
        totalAmount={666}
        // TODO
        curator={'TODO'}
        allowedCreditClasses={
          data?.classes
            ? data.classes.map(basketClass => ({
                id: basketClass?.info?.classId || '-',
                name: basketClass?.info?.classId || '-',
              }))
            : [{ id: '-', name: '-' }]
        }
        // TODO: DISABLED
        // minStartDate={data?.basket?.basket?.dateCriteria?.minStartDate}
        // startDateWindow={
        //   data?.basket?.basket?.dateCriteria?.startDateWindow?.seconds
        // }
      />
      {/* <BasketEcocredits /> */}
    </>
  );
};

export { BasketDetails };
