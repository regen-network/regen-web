import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllProjectsQuery } from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetAllProjectsResponse =
  QueryObserverOptions<AllProjectsQuery>;

export type ReactQueryGetAllProjectsParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryGetAllProjectsResponse>;
