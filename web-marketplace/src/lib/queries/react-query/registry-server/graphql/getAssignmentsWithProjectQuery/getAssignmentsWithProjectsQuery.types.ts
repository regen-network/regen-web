import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  AssignmentsWithProjectsByAccountIdQuery,
  AssignmentsWithProjectsByAccountIdQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAssignmentsWithProjectsQueryResponse =
  QueryObserverOptions<AssignmentsWithProjectsByAccountIdQuery>;

export type ReactQueryGetAssignmentsWithProjectsQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & AssignmentsWithProjectsByAccountIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAssignmentsWithProjectsQueryResponse>;
