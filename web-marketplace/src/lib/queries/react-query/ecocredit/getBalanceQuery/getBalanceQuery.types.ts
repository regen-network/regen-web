import { QueryBalanceResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryBalanceProps } from 'lib/ecocredit/api';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBalanceResponse =
  QueryObserverOptions<QueryBalanceResponse | null>;

export type ReactQueryBalanceProps = Omit<QueryBalanceProps, 'client'> & {
  client?: QueryBalanceProps['client'];
} & ReactQueryBuilderResponse<ReactQueryBalanceResponse>;
