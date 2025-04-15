import { QueryBatchesByProjectResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryBatchesByProjectProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBatchesByProjectResponse =
  QueryObserverOptions<QueryBatchesByProjectResponse | void>;

export type ReactQueryBatchesByProjectProps = Omit<
  QueryBatchesByProjectProps,
  'client'
> & {
  client?: QueryBatchesByProjectProps['client'];
} & ReactQueryBuilderResponse<ReactQueryBatchesByProjectResponse>;
