import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllHomePageQuery } from 'generated/sanity-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryAllHomePageQueryResponse =
  QueryObserverOptions<AllHomePageQuery>;

export type ReactQueryAllHomePageQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryAllHomePageQueryResponse>;
