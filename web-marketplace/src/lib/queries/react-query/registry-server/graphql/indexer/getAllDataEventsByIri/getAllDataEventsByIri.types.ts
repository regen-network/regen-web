import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  IndexerAllDataEventsByIriQuery,
  IndexerAllDataEventsByIriQueryVariables,
} from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryAllDataEventsByIriResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerAllDataEventsByIriQuery> | null>;

export type ReactQueryAllDataEventsByIriProps = {
  client: ApolloClient<unknown>;
} & IndexerAllDataEventsByIriQueryVariables &
  ReactQueryBuilderResponse<ReactQueryAllDataEventsByIriResponse>;
