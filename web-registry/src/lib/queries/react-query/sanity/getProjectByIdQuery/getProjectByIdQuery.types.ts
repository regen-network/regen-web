import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectByIdQuery,
  ProjectByIdQueryVariables,
} from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetProjectByIdResponse =
  QueryObserverOptions<ProjectByIdQuery>;

export type ReactQueryGetProjectByIdQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
} & ProjectByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetProjectByIdResponse>;
