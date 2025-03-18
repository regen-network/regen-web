import { QueryBatchesByClassResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryBatchesByClassProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBatchesByClassResponse =
  QueryObserverOptions<QueryBatchesByClassResponse | void>;

export type ReactQueryBatchesByClassProps = Omit<
  QueryBatchesByClassProps,
  'client'
> & {
  client?: QueryBatchesByClassProps['client'];
} & ReactQueryBuilderResponse<ReactQueryBatchesByClassResponse>;
