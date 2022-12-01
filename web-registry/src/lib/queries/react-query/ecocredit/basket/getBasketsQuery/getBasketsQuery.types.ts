import {
  DeepPartial,
  QueryBasketsRequest,
  QueryBasketsResponse,
  QueryClientImpl as BasketQueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryBasketsResponse = QueryObserverOptions<
  QueryBasketsResponse | undefined
>;

export type ReactQueryBasketsProps = {
  request: DeepPartial<QueryBasketsRequest>;
} & {
  client?: BasketQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryBasketsResponse>;
