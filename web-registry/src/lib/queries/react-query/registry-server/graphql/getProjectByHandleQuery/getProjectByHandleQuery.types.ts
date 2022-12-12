import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectByHandleQuery,
  ProjectByHandleQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryProjectByHandleResponse = QueryObserverOptions<
  ApolloQueryResult<ProjectByHandleQuery>
>;

export type ReactQueryProjectByHandleProps = {
  client: ApolloClient<NormalizedCacheObject>;
} & ProjectByHandleQueryVariables &
  ReactQueryBuilderResponse<ReactQueryProjectByHandleResponse>;
