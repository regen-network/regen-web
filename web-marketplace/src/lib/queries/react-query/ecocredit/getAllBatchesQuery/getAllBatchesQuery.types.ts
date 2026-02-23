import { QueryBatchesResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryBatchesProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBatchesResponse =
  QueryObserverOptions<QueryBatchesResponse | void>;

export type ReactQueryBatchesProps = Omit<QueryBatchesProps, 'client'> & {
  client?: QueryBatchesProps['client'];
} & ReactQueryBuilderResponse<ReactQueryBatchesResponse>;
