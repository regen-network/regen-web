import {
  DeepPartial,
  QueryBasketRequest,
  QueryBasketResponse,
  QueryClientImpl as BasketQueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryBasketResponse = QueryObserverOptions<
  QueryBasketResponse | undefined
>;

export type ReactQueryBasketProps = {
  request: DeepPartial<QueryBasketRequest>;
} & {
  client?: BasketQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryBasketResponse>;
