import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectByHandleQuery,
  ProjectByHandleQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryProjectByHandleResponse =
  QueryObserverOptions<ApolloQueryResult<ProjectByHandleQuery> | null>;

export type ReactQueryProjectByHandleProps = {
  client: ApolloClient<object>;
} & ProjectByHandleQueryVariables &
  ReactQueryBuilderResponse<ReactQueryProjectByHandleResponse>;
