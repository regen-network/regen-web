import { useLingui } from '@lingui/react';

import { cn } from 'web-components/src/utils/styles/cn';

import type { BatchTotalsForProject } from '../../../types/ledger/ecocredit';
import {
  BufferPoolCreditsValue,
  ForSaleCreditsValue,
  IssuedCreditsValue,
  RetiredCreditsValue,
  TradableCreditsValue,
} from '../ProjectBatchTotals/BatchTotals.items';
import { ISSUED_CLASS_CREDITS_TOOLTIP } from '../ProjectBatchTotals/ProjectBatchTotals.constants';

export type ClassBatchTotalsProps = {
  totals: BatchTotalsForProject;
  className?: string;
};

export function ClassBatchTotals({
  totals,
  className,
}: ClassBatchTotalsProps): JSX.Element {
  const { _ } = useLingui();
  return (
    <div className={cn('grid grid-cols-1 gap-20', className)}>
      <IssuedCreditsValue
        number={
          totals.tradableAmount + totals.retiredAmount + totals.bufferPoolAmount
        }
        tooltipLabel={_(ISSUED_CLASS_CREDITS_TOOLTIP)}
      />
      <ForSaleCreditsValue number={totals.forSaleAmount} />
      <TradableCreditsValue number={totals.tradableAmount} />
      {totals.bufferPoolAmount > 0 && (
        <BufferPoolCreditsValue number={totals.bufferPoolAmount} />
      )}
      <RetiredCreditsValue number={totals.retiredAmount} />
    </div>
  );
}
