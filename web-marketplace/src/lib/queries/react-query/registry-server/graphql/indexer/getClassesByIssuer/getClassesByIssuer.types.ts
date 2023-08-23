import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  IndexerClassesByIssuerQuery,
  IndexerClassesByIssuerQueryVariables,
} from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryClassesByIssuerResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerClassesByIssuerQuery> | null>;

export type ReactQueryClassesByIssuerProps = {
  client: ApolloClient<unknown>;
} & IndexerClassesByIssuerQueryVariables &
  ReactQueryBuilderResponse<ReactQueryClassesByIssuerResponse>;
