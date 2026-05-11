import { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { getBatchesTotal } from 'lib/ecocredit/api';

import { ClassBatchTotals } from 'components/molecules/ClassBatchTotals/ClassBatchTotals';
import { TableTabs } from 'components/organisms/TableTabs';
import { useBufferPoolAmount } from 'hooks/useBufferPoolAmount';

import { getCreditClassDetailsTabs } from './CreditClassDetails.TableTabs.config';
import { CreditClassDetailsTableTabsProps } from './CreditClassDetails.TableTabs.types';

export const CreditClassDetailsTableTabs = (
  props: CreditClassDetailsTableTabsProps,
) => {
  const {
    creditBatches,
    creditClassMetadata,
    creditsForSale,
    onChainCreditClassId,
  } = props;
  const tabs = getCreditClassDetailsTabs(props);
  const { _ } = useLingui();

  const bufferPoolAmount = useBufferPoolAmount(
    creditClassMetadata?.['regen:bufferPoolAccounts'],
    onChainCreditClassId ? `${onChainCreditClassId}-` : undefined,
  );

  const { totals } = useMemo(
    () =>
      getBatchesTotal(creditBatches ?? [], creditsForSale, bufferPoolAmount),
    [creditBatches, creditsForSale, bufferPoolAmount],
  );

  return (
    <TableTabs tabs={tabs} title={_(msg`Credits`)}>
      <ClassBatchTotals
        totals={totals}
        className="sm:flex sm:flex-row sm:[&>*]:flex-1 mb-20"
      />
    </TableTabs>
  );
};
