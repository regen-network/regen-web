import React from 'react';
import { useParams } from 'react-router-dom';

import { useBasketDetails } from '../hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BasketOverview, BasketEcocredits } from '../components/organisms';

const BasketDetails: React.FC = () => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const data = useBasketDetails(basketDenom);

  return (
    <>
      <BasketOverview
        name={data.overview.name}
        displayDenom={data.overview.displayDenom}
        description={data.overview.description}
        totalAmount={data.overview.totalAmount}
        // TODO
        curator={data.overview.curator}
        allowedCreditClasses={data.overview.allowedCreditClasses}
        // TODO: DISABLED
        // minStartDate={data?.basket?.basket?.dateCriteria?.minStartDate}
        // startDateWindow={
        //   data?.basket?.basket?.dateCriteria?.startDateWindow?.seconds
        // }
      />

      <BasketEcocredits batches={data.ecocreditBatches} />
    </>
  );
};

export { BasketDetails };
