import {
  QueryProjectsByAdminRequest,
  QueryProjectsByAdminResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryProjectsByAdminResponse =
  QueryObserverOptions<QueryProjectsByAdminResponse | null>;

export type ReactQueryProjectsByAdminProps = {
  request: QueryProjectsByAdminRequest;
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryProjectsByAdminResponse>;
