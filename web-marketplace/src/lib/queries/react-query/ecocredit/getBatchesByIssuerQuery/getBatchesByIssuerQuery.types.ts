import { QueryBatchesByIssuerResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryBatchesByIssuerProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBatchesByIssuerResponse =
  QueryObserverOptions<QueryBatchesByIssuerResponse | void>;

export type ReactQueryBatchesByIssuerProps = Omit<
  QueryBatchesByIssuerProps,
  'client'
> & {
  client?: QueryBatchesByIssuerProps['client'];
} & ReactQueryBuilderResponse<ReactQueryBatchesByIssuerResponse>;
