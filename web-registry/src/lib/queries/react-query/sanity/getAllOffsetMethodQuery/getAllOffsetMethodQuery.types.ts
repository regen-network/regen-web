import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllProjectOffsetMethodQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryAllOffsetMethodQueryResponse =
  QueryObserverOptions<AllProjectOffsetMethodQuery>;

export type ReactQueryAllOffsetMethodQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryAllOffsetMethodQueryResponse>;
