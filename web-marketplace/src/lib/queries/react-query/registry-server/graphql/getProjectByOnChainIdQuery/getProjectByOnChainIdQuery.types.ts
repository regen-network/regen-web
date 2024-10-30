import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectByOnChainIdQuery,
  ProjectByOnChainIdQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryProjectByOnChainIdResponse =
  QueryObserverOptions<ApolloQueryResult<ProjectByOnChainIdQuery> | null>;

export type ReactQueryProjectByOnChainIdProps = {
  client: ApolloClient<unknown>;
  languageCode: string;
} & ProjectByOnChainIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryProjectByOnChainIdResponse>;
