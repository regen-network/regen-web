import {
  QueryAllowedDenomsRequest,
  QueryAllowedDenomsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { MarketplaceQueryClient } from 'lib/ecocredit/marketplace/marketplace.types';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryAllowedDenomResponse = QueryObserverOptions<
  QueryAllowedDenomsResponse | undefined
>;

export type ReactQueryAllowedDenomProps = Omit<
  QueryAllowedDenomsRequest,
  '$type'
> &
  ReactQueryBuilderResponse<ReactQueryAllowedDenomResponse> & {
    client?: MarketplaceQueryClient;
  };
