import {
  QueryClassRequest,
  QueryClassResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryClassResponse =
  QueryObserverOptions<QueryClassResponse | null>;

export type ReactQueryClassProps = {
  request: QueryClassRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryClassResponse>;
