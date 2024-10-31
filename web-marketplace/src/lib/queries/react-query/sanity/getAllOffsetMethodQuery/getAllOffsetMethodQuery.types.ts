import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllOffsetMethodQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryAllOffsetMethodQueryResponse =
  QueryObserverOptions<AllOffsetMethodQuery>;

export type ReactQueryAllOffsetMethodQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryAllOffsetMethodQueryResponse>;
