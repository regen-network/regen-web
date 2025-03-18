import {
  QueryBalanceRequest,
  QueryBalanceResponse,
} from '@regen-network/api/cosmos/bank/v1beta1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryBalanceResponse =
  QueryObserverOptions<QueryBalanceResponse | null>;

export type ReactQueryBalanceProps = {
  request: QueryBalanceRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryBalanceResponse>;
