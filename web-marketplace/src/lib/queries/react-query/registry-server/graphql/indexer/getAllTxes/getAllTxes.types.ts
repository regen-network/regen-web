import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  IndexerAllTxesQuery,
  IndexerAllTxesQueryVariables,
} from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryAllTxesResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerAllTxesQuery> | null>;

export type ReactQueryAllTxesProps = {
  client: ApolloClient<unknown>;
} & IndexerAllTxesQueryVariables &
  ReactQueryBuilderResponse<ReactQueryAllTxesResponse>;
