import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import Section from 'web-components/lib/components/section';
import SellOrdersTable from '../../../components/organisms/SellOrdersTable/SellOrdersTable';
import useQueryListBatchInfo from '../../../hooks/useQueryListBatchInfo';
import { sellOrdersMock } from './Storefront.mock';
import normalizeSellOrders from './Storefront.normalizer';
import { sortByExpirationDate } from './Storefront.utils';

export const Storefront = (): JSX.Element => {
  const sellOrdersResponse = { sellOrders: sellOrdersMock };
  const sellOrders = sellOrdersResponse.sellOrders;
  const batchDenoms = useMemo(
    () => sellOrders.map(sellOrder => sellOrder.batch_denom),
    [sellOrders],
  );
  const batchInfos = useQueryListBatchInfo(batchDenoms) ?? [];
  const normalizedSellOrders = normalizeSellOrders({
    batchInfos,
    sellOrders,
  }).sort(sortByExpirationDate);

  return (
    <Section>
      <h2>Sell orders</h2>
      <Box sx={{ paddingBottom: '150px' }}>
        <SellOrdersTable sellOrders={normalizedSellOrders} />
      </Box>
    </Section>
  );
};
