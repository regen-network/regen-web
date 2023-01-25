import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getAllBasketDetailsPageQuery } from 'lib/queries/react-query/sanity/getAllBasketDetailsPageQuery/getAllBasketDetailsPageQuery';

import { GettingStartedResourcesCardDefault } from 'components/molecules/GettingStartedResourcesCardDefault/GettingStartedResourcesCardDefault';
import { BasketDetailsActionsBar } from 'components/organisms/BasketDetailsActionsBar/BasketDetailsActionsBar';

import {
  BasketEcocreditsTable,
  BasketOverview,
} from '../../components/organisms';
import { client as sanityClient } from '../../lib/clients/sanity';
import { BasketDetailsSectionLayout } from './BasketDetails.SectionLayout';
import useBasketDetails from './hooks/useBasketDetails';

const BasketDetails: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const data = useBasketDetails(basketDenom);

  const { data: allBasketDetailsPageData } = useQuery(
    getAllBasketDetailsPageQuery({ sanityClient, enabled: !!sanityClient }),
  );
  const content = allBasketDetailsPageData?.allBasketDetailsPage?.[0];
  const gettingStartedResourcesCard = content?.gettingStartedResourcesCard;

  return (
    <>
      {data.overview && <BasketOverview {...data.overview} />}
      {data.creditBatches && (
        <BasketDetailsSectionLayout>
          <BasketEcocreditsTable batches={data.creditBatches} />
          {gettingStartedResourcesCard && (
            <Box sx={{ mt: 19.25 }}>
              <GettingStartedResourcesCardDefault
                card={gettingStartedResourcesCard}
              />
            </Box>
          )}
        </BasketDetailsSectionLayout>
      )}
      <BasketDetailsActionsBar />
    </>
  );
};

export { BasketDetails };
