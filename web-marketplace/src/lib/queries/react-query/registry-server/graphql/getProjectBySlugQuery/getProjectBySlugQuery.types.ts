import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectBySlugQuery,
  ProjectBySlugQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryProjectBySlugResponse =
  QueryObserverOptions<ApolloQueryResult<ProjectBySlugQuery> | null>;

export type ReactQueryProjectBySlugProps = {
  client: ApolloClient<unknown>;
  languageCode: string;
} & ProjectBySlugQueryVariables &
  ReactQueryBuilderResponse<ReactQueryProjectBySlugResponse>;
