import { quantityFormatNumberOptions } from 'config/decimals';

import { formatNumber } from 'web-components/src/utils/format';

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
  let tradeable: number | undefined = undefined;
  let retired: number | undefined = undefined;
  let created: number | undefined = undefined;

  if (batches.length > 0) {
    batches.forEach(batch => {
      const batchTradable = parseNumber(batch.tradableAmount);
      const batchRetired = parseNumber(batch.retiredAmount);
      const batchCancelled = parseNumber(batch.cancelledAmount);
      tradeable = (tradeable ?? 0) + batchTradable;
      retired = (retired ?? 0) + batchRetired;
      created = (created ?? 0) + batchTradable + batchRetired + batchCancelled;
    });
  }

  return {
    tradeable: tradeable
      ? formatNumber({
          num: tradeable,
          ...quantityFormatNumberOptions,
        })
      : undefined,
    retired: retired
      ? formatNumber({ num: retired, ...quantityFormatNumberOptions })
      : undefined,
    created: created
      ? formatNumber({ num: created, ...quantityFormatNumberOptions })
      : undefined,
  };
};
