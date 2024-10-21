import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { LastRetirementQuery } from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryLastRetirementResponse =
  QueryObserverOptions<ApolloQueryResult<LastRetirementQuery> | null>;

export type ReactQueryLastRetirementProps = {
  client: ApolloClient<unknown>;
} & ReactQueryBuilderResponse<ReactQueryLastRetirementResponse>;
