import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

export type CreditClassDetailsTableTabsProps = {
  creditClassMetadata?: CreditClassMetadataLD;
  onChainCreditClassId?: string;
  creditBatches?: BatchInfoWithSupply[];
  onTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
};
