import {
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
} from '@regen-network/api/cosmos/bank/v1beta1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryAllBalancesResponse = QueryObserverOptions<
  QueryAllBalancesResponse | undefined
>;

export type ReactQueryAllBalancesProps = {
  request: QueryAllBalancesRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryAllBalancesResponse>;
