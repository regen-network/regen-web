import { QueryBatchesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { AddDataToBatchParams, QueryBatchesProps } from 'lib/ecocredit/api';

/* BatchesQuery */

export type QueryBatchesLoaderProps = Omit<QueryBatchesProps, 'client'> & {
  client?: QueryBatchesProps['client'];
};

export type QueryBatchesLoaderResponse = {
  queryKey?: string[];
  queryFn: () => Promise<QueryBatchesResponse | void>;
};

/* AddDataToBatchesQuery */

export type AddDataToBatchLoaderParams = Omit<
  AddDataToBatchParams,
  'batches'
> & {
  batches?: AddDataToBatchParams['batches'];
};

export type AddDataToBatchesQueryLoaderResponse = {
  queryKey?: string[];
  queryFn: () => Promise<BatchInfoWithSupply[] | void>;
};
