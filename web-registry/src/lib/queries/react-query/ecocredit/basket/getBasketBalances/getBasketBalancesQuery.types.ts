import {
  DeepPartial,
  QueryBasketBalancesRequest,
  QueryBasketBalancesResponse,
  QueryClientImpl as BasketQueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryBasketBalancesResponse =
  QueryObserverOptions<QueryBasketBalancesResponse | null>;

export type ReactQueryBasketBalancesProps = {
  request: DeepPartial<QueryBasketBalancesRequest>;
} & {
  client?: BasketQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryBasketBalancesResponse>;
