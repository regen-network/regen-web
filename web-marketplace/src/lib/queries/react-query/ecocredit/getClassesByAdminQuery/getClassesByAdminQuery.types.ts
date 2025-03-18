import {
  QueryClassesByAdminRequest,
  QueryClassesByAdminResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryClassesByAdminResponse =
  QueryObserverOptions<QueryClassesByAdminResponse | null>;

export type ReactQueryClassesByAdminProps = {
  request: QueryClassesByAdminRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryClassesByAdminResponse>;
