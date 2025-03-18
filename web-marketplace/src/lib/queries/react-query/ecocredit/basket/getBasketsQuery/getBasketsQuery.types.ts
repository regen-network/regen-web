import {
  QueryBasketsRequest,
  QueryBasketsResponse,
} from '@regen-network/api/regen/ecocredit/basket/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryBasketsResponse = QueryObserverOptions<
  QueryBasketsResponse | undefined
>;

export type ReactQueryBasketsProps = {
  request: QueryBasketsRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryBasketsResponse>;
