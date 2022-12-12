import {
  DeepPartial,
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
  QueryClientImpl as BankQueryClientImpl,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryAllBalancesResponse = QueryObserverOptions<
  QueryAllBalancesResponse | undefined
>;

export type ReactQueryAllBalancesProps = {
  request: DeepPartial<QueryAllBalancesRequest>;
} & {
  client?: BankQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryAllBalancesResponse>;
