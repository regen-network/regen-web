import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  IndexerRetirementByTxHashQuery,
  IndexerRetirementByTxHashQueryVariables,
} from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryRetirementByTxHashResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerRetirementByTxHashQuery> | null>;

export type ReactQueryRetirementByTxHashProps = {
  client: ApolloClient<unknown>;
} & IndexerRetirementByTxHashQueryVariables &
  ReactQueryBuilderResponse<ReactQueryRetirementByTxHashResponse>;
