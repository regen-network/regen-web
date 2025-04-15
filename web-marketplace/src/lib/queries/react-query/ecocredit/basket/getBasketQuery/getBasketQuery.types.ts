import {
  QueryBasketRequest,
  QueryBasketResponse,
} from '@regen-network/api/regen/ecocredit/basket/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryBasketResponse = QueryObserverOptions<
  QueryBasketResponse | undefined
>;

export type ReactQueryBasketProps = {
  request: QueryBasketRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryBasketResponse>;
