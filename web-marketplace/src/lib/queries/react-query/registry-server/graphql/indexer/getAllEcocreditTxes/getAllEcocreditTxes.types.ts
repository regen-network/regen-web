import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  IndexerAllEcocreditTxesQuery,
  IndexerAllEcocreditTxesQueryVariables,
} from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryAllEcocreditTxesResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerAllEcocreditTxesQuery> | null>;

export type ReactQueryAllEcocreditTxesProps = {
  client: ApolloClient<unknown>;
} & IndexerAllEcocreditTxesQueryVariables &
  ReactQueryBuilderResponse<ReactQueryAllEcocreditTxesResponse>;
