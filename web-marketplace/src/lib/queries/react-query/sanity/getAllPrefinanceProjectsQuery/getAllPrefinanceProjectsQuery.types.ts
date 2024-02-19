import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllPrefinanceProjectQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetAllPrefinanceProjectsResponse =
  QueryObserverOptions<AllPrefinanceProjectQuery>;

export type ReactQueryGetAllPrefinanceProjectsParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryGetAllPrefinanceProjectsResponse>;
