import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { TebuBannerQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryTebuBannerQueryResponse =
  QueryObserverOptions<TebuBannerQuery>;

export type ReactQueryTebuBannerQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryTebuBannerQueryResponse>;
