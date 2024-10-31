import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ProjectByIdQuery, ProjectByIdQueryVariables } from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryProjectByIdResponse =
  QueryObserverOptions<ApolloQueryResult<ProjectByIdQuery> | null>;

export type ReactQueryProjectByIdProps = {
  client: ApolloClient<object>;
  languageCode: string;
} & ProjectByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryProjectByIdResponse>;
