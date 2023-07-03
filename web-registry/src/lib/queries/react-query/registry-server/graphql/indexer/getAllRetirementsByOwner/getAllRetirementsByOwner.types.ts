import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  IndexerAllRetirementsByOwnerQuery,
  IndexerAllRetirementsByOwnerQueryVariables,
} from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryAllRetirementsByOwnerResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerAllRetirementsByOwnerQuery> | null>;

export type ReactQueryAllRetirementsByOwnerProps = {
  client: ApolloClient<unknown>;
} & IndexerAllRetirementsByOwnerQueryVariables &
  ReactQueryBuilderResponse<ReactQueryAllRetirementsByOwnerResponse>;
