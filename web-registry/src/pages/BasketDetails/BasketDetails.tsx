import React from 'react';
import { useParams } from 'react-router-dom';

import { BasketDetailsActionsBar } from 'components/organisms/BasketDetailsActionsBar/BasketDetailsActionsBar';

import {
  BasketEcocreditsTable,
  BasketOverview,
} from '../../components/organisms';
import { BasketDetailsSectionLayout } from './BasketDetails.SectionLayout';
import useBasketDetails from './hooks/useBasketDetails';

const BasketDetails: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const data = useBasketDetails(basketDenom);

  return (
    <>
      {data.overview && <BasketOverview {...data.overview} />}
      {data.creditBatches && (
        <BasketDetailsSectionLayout>
          <BasketEcocreditsTable batches={data.creditBatches} />
        </BasketDetailsSectionLayout>
      )}
      <BasketDetailsActionsBar />
    </>
  );
};

export { BasketDetails };
