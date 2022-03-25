import { useState, useEffect } from 'react';

import {
  QueryBasketBalancesResponse,
  QueryBasketResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import {
  QueryBatchInfoResponse,
  QueryClassInfoResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { QueryDenomMetadataResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import useQueryBasket from './useQueryBasket';
import useQueryBatchInfo from './useQueryBatchInfo';
import useQueryDenomMetadata from './useQueryDenomMetadata';
import useQueryBasketBalances from './useQueryBasketBalances';
import useQueryClassInfo from './useQueryClassInfo';

type BasketDetails = {
  basket?: QueryBasketResponse;
  balances?: QueryBasketBalancesResponse[];
  metadata?: QueryDenomMetadataResponse;
  classes?: Array<QueryClassInfoResponse | undefined>;
  batches?: Array<QueryBatchInfoResponse | undefined>;
};

const useBasketDetails = (basketDenom?: string): BasketDetails | undefined => {
  const basket = useQueryBasket(basketDenom);
  const basketBalances = useQueryBasketBalances(basketDenom);
  const fetchClassInfo = useQueryClassInfo();
  const fetchDenomMetadata = useQueryDenomMetadata();
  const fetchBatchInfo = useQueryBatchInfo();

  const [data, setData] = useState<BasketDetails | undefined>();

  // Store hooked basket DTO
  useEffect(() => {
    if (!basket) return;
    setData(prev => ({ ...prev, basket }));
  }, [basket]);

  // Store hooked basket balances DTOs
  useEffect(() => {
    if (!basketBalances) return;
    setData(prev => ({ ...prev, basketBalances }));
  }, [basketBalances]);

  // Fetch and store allowed credit classes DTOs
  useEffect(() => {
    if (!basket) return;
    async function fetchData(basketClasses: string[]): Promise<void> {
      const classes = await Promise.all(
        basketClasses.map(async classId => await fetchClassInfo(classId)),
      );
      setData(prev => ({ ...prev, classes }));
    }
    fetchData(basket.classes);
  }, [basket, fetchClassInfo]);

  // Fetch and store basket metadata DTO
  useEffect(() => {
    if (!basketDenom) return;
    async function fetchData(basketDenom: string): Promise<void> {
      const metadata = await fetchDenomMetadata(basketDenom);
      setData(prev => ({ ...prev, metadata }));
    }
    fetchData(basketDenom);
  }, [basketDenom, fetchDenomMetadata]);

  // Fetch and store corresponding batches info DTOs
  useEffect(() => {
    if (!basketBalances) return;
    async function fetchData(
      basketBalances: QueryBasketBalancesResponse,
    ): Promise<void> {
      const batches = await Promise.all(
        basketBalances.balances.map(
          async batch => await fetchBatchInfo(batch.batchDenom),
        ),
      );
      setData(prev => ({ ...prev, batches }));
    }
    fetchData(basketBalances);
  }, [basketBalances, fetchBatchInfo]);

  // eslint-disable-next-line no-console
  console.log('*** data', data);

  return data;
};

export default useBasketDetails;
