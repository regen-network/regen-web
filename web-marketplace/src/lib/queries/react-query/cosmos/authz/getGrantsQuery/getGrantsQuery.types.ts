import {
  QueryGrantsRequest,
  QueryGrantsResponse,
} from '@regen-network/api/cosmos/authz/v1beta1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGrantsResponse =
  QueryObserverOptions<QueryGrantsResponse | null>;

export type ReactQueryGrantsProps = {
  request: QueryGrantsRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryGrantsResponse>;
