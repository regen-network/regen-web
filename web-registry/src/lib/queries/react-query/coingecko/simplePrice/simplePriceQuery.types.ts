import { QueryObserverOptions } from '@tanstack/react-query';

import { FetchSimplePriceResponse } from 'lib/coingecko';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQuerySimplePriceResponse =
  QueryObserverOptions<FetchSimplePriceResponse>;

export type ReactQuerySimplePriceParams = {
  request?: {
    ids?: string;
    vsCurrencies?: string;
  };
} & ReactQueryBuilderResponse<ReactQuerySimplePriceResponse>;
