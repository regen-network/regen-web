import {
  QueryBasketBalancesRequest,
  QueryBasketBalancesResponse,
} from '@regen-network/api/regen/ecocredit/basket/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryBasketBalancesResponse =
  QueryObserverOptions<QueryBasketBalancesResponse | null>;

export type ReactQueryBasketBalancesProps = {
  request: QueryBasketBalancesRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryBasketBalancesResponse>;
