import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { TerrasosBookCallQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryTerrasosBookCallQueryResponse =
  QueryObserverOptions<TerrasosBookCallQuery>;

export type ReactQueryTerrasosBookCallQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryTerrasosBookCallQueryResponse>;
