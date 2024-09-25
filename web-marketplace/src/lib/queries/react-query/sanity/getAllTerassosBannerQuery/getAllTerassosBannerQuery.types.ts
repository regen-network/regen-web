import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { TerrasosHeaderQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryTerrasosHeaderQueryResponse =
  QueryObserverOptions<TerrasosHeaderQuery>;

export type ReactQueryAllActivityQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryTerrasosHeaderQueryResponse>;
