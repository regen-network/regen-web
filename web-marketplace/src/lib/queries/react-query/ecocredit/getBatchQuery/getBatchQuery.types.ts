import { QueryBatchResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryBatchInfoProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBatchResponse =
  QueryObserverOptions<QueryBatchResponse | null>;

export type ReactQueryBatchesProps = Omit<QueryBatchInfoProps, 'client'> & {
  client?: QueryBatchInfoProps['client'];
} & ReactQueryBuilderResponse<ReactQueryBatchResponse>;
