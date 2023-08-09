import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { IndexerAllTxesCountQuery } from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryAllTxesCountResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerAllTxesCountQuery> | null>;

export type ReactQueryAllTxesCountProps = {
  client: ApolloClient<unknown>;
} & ReactQueryBuilderResponse<ReactQueryAllTxesCountResponse>;
