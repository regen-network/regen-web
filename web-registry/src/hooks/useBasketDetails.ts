import { useState, useEffect } from 'react';

import { QueryBatchInfoResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/types';

import useQueryBasket from './useQueryBasket';
import useQueryBasketBalances from './useQueryBasketBalances';
import useQueryDenomMetadata from './useQueryDenomMetadata';
import useQueryListClassInfo from './useQueryListClassInfo';
import useQueryListBatchInfo from './useQueryListBatchInfo';
import { BasketEcocredit } from '../types/ledger';
import { BasketOverviewProps } from '../components/organisms';

type BasketDetails = {
  overview: BasketOverviewProps;
  ecocreditBatches: BasketEcocredit[];
};

const useBasketDetails = (basketDenom?: string): BasketDetails => {
  const basket = useQueryBasket(basketDenom);
  const basketBalances = useQueryBasketBalances(basketDenom);
  const basketMetadata = useQueryDenomMetadata(basketDenom);

  const basketClasses = useQueryListClassInfo(basket?.classes);

  const [batches, setBatches] = useState<string[]>();
  const basketBatches = useQueryListBatchInfo(batches);

  // local state for all raw data queries
  // custom ecocredit batches data for <BasketEcocreditsTable />
  const [ecocreditBatches, setEcocreditBatches] = useState<BasketEcocredit[]>();

  // Batches string list query param for `useQueryListBatchInfo(batches)`
  useEffect(() => {
    if (!basketBalances?.balances) return;
    setBatches(basketBalances.balances.map(balance => balance.batchDenom));
  }, [basketBalances?.balances]);

  // TODO: extend batches with projectName and projectDisplay
  // required in <BasketEcocreditsTable />
  useEffect(() => {
    if (!basketBatches) return;

    async function fetchData(
      batchesInfo: QueryBatchInfoResponse[],
    ): Promise<void> {
      const batches = batchesInfo.map(batch => ({
        batchInfo: batch.info as BatchInfo,
        // TODO
        projectName: '---',
        projectDisplay: '---',
      }));
      setEcocreditBatches(batches);
    }

    fetchData(basketBatches);
  }, [basketBatches]);

  const totalAmount = basketBalances?.balances.reduce(
    (acc, obj) => acc + parseFloat(obj.balance),
    0,
  );

  const allowedCreditClasses = basketClasses?.map(basketClass => ({
    id: basketClass.info?.classId || '-',
    name: basketClass?.info?.classId || '-',
  }));

  return {
    overview: {
      name: basket?.basket?.name || '-',
      displayDenom: basketMetadata?.metadata?.display || '-',
      description: basketMetadata?.metadata?.description || '-',
      totalAmount: totalAmount || 0,
      curator: 'TODO' || '-',
      allowedCreditClasses: allowedCreditClasses || [{ id: '-', name: '-' }],
      minStartDate: '-',
      // startDateWindow: '-',
    },
    ecocreditBatches: ecocreditBatches || [],
  };
};

export default useBasketDetails;
