import { QueryObserverOptions } from '@tanstack/react-query';

import { FetchSimplePriceResponse } from 'lib/coingecko';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQuerySimplePriceResponse =
  QueryObserverOptions<FetchSimplePriceResponse | null>;

export type ReactQuerySimplePriceParams = {
  request?: {
    ids?: string;
    vsCurrencies?: string;
  };
} & ReactQueryBuilderResponse<ReactQuerySimplePriceResponse>;
