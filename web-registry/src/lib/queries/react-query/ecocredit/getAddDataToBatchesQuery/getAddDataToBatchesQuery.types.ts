import { QueryClientImpl as DataQueryClientImpl } from '@regen-network/api/lib/generated/regen/data/v1/query';
import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { AddDataToBatchesParams } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryAddDataToBatchesResponse = QueryObserverOptions<
  BatchInfoWithSupply[] | null
>;

export type ReactQueryAddDataToBatchesParams = Omit<
  AddDataToBatchesParams,
  'batches'
> & {
  batches?: AddDataToBatchesParams['batches'];
  reactQueryClient?: QueryClient;
  dataClient?: DataQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryAddDataToBatchesResponse>;
