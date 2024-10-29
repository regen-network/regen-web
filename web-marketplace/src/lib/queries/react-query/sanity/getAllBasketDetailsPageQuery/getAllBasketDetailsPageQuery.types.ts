import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllBasketDetailsPageQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryAllBasketDetailsPageQueryResponse =
  QueryObserverOptions<AllBasketDetailsPageQuery>;

export type ReactQueryAllBasketDetailsQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryAllBasketDetailsPageQueryResponse>;
