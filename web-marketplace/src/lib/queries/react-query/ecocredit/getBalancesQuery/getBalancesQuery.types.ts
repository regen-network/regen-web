import { QueryBalancesResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryBalancesProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBalancesResponse =
  QueryObserverOptions<QueryBalancesResponse | void>;

export type ReactQueryBalancesesProps = Omit<QueryBalancesProps, 'client'> & {
  client?: QueryBalancesProps['client'];
} & ReactQueryBuilderResponse<ReactQueryBalancesResponse>;
