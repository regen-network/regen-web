import {
  DeepPartial,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryClientImpl as BankQueryClientImpl,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryBalanceResponse = QueryObserverOptions<
  QueryBalanceResponse | undefined
>;

export type ReactQueryBalanceProps = {
  request: DeepPartial<QueryBalanceRequest>;
} & {
  client?: BankQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryBalanceResponse>;
