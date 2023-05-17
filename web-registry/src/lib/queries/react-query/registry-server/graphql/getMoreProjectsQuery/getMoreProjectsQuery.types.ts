import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { MoreProjectsQuery } from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetMoreProjectsResponse =
  QueryObserverOptions<MoreProjectsQuery>;

export type ReactQueryGetMoreProjectsParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryGetMoreProjectsResponse>;
