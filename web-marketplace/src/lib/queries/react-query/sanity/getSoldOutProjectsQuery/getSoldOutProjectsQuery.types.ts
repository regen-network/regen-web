import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllSoldOutProjectsQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetSoldOutProjectsResponse =
  QueryObserverOptions<AllSoldOutProjectsQuery>;

export type ReactQueryGetSoldOutProjectsQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryGetSoldOutProjectsResponse>;
