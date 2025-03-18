import {
  QueryAllowedDenomsRequest,
  QueryAllowedDenomsResponse,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryAllowedDenomResponse = QueryObserverOptions<
  QueryAllowedDenomsResponse | undefined
>;

export type ReactQueryAllowedDenomProps = QueryAllowedDenomsRequest &
  ReactQueryBuilderResponse<ReactQueryAllowedDenomResponse> & {
    client?: QueryClient;
  };
