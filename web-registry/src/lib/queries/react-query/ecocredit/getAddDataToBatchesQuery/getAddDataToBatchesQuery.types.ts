import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { AddDataToBatchParams } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryAddDataToBatchResponse = QueryObserverOptions<
  BatchInfoWithSupply[] | void
>;

export type ReactQueryAddDataToBatchParams = Omit<
  AddDataToBatchParams,
  'batches'
> & {
  batches?: AddDataToBatchParams['batches'];
  reactQueryClient?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryAddDataToBatchResponse>;
