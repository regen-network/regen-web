import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectByOnChainIdQuery,
  ProjectByOnChainIdQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryProjectByOnChainIdResponse = QueryObserverOptions<
  ApolloQueryResult<ProjectByOnChainIdQuery>
>;

export type ReactQueryProjectByOnChainIdProps = {
  client: ApolloClient<NormalizedCacheObject>;
} & ProjectByOnChainIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryProjectByOnChainIdResponse>;
