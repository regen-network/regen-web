import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectIdByOnChainIdQuery,
  ProjectIdByOnChainIdQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryProjectIdByOnChainIdResponse =
  QueryObserverOptions<ApolloQueryResult<ProjectIdByOnChainIdQuery> | null>;

export type ReactQueryProjectIdByOnChainIdProps = {
  client: ApolloClient<unknown>;
} & ProjectIdByOnChainIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryProjectIdByOnChainIdResponse>;
