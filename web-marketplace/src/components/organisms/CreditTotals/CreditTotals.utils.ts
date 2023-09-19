import { quantityFormatNumberOptions } from 'config/decimals';

import { formatNumber } from 'web-components/lib/utils/format';

import { BatchInfoWithSupply } from '../../../types/ledger/ecocredit';
import { CreditTotalData } from './CreditTotals.types';

export const parseNumber = (value: any): number => {
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  if (typeof value === 'number') {
    return value;
  }
  return 0;
};

export const sumBatchTotals = (
  batches: BatchInfoWithSupply[],
): CreditTotalData => {
  let tradeable = 0;
  let retired = 0;
  let created = 0;

  batches.forEach(batch => {
    const batchTradable = parseNumber(batch.tradableAmount);
    const batchRetired = parseNumber(batch.retiredAmount);
    const batchCancelled = parseNumber(batch.cancelledAmount);
    tradeable += batchTradable;
    retired += batchRetired;
    created += batchTradable + batchRetired + batchCancelled;
  });

  return {
    tradeable: formatNumber({
      num: tradeable,
      ...quantityFormatNumberOptions,
    }),
    retired: formatNumber({ num: retired, ...quantityFormatNumberOptions }),
    created: formatNumber({ num: created, ...quantityFormatNumberOptions }),
  };
};
