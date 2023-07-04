import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  IndexerRetirementByNodeIdQuery,
  IndexerRetirementByNodeIdQueryVariables,
} from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryRetirementByNodeIdResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerRetirementByNodeIdQuery> | null>;

export type ReactQueryRetirementByNodeIdProps = {
  client: ApolloClient<unknown>;
} & IndexerRetirementByNodeIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryRetirementByNodeIdResponse>;
