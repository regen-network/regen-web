import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  IndexerOrdersByBuyerAddressQuery,
  IndexerOrdersByBuyerAddressQueryVariables,
} from 'generated/indexer-graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryOrdersByBuyerAddressResponse =
  QueryObserverOptions<ApolloQueryResult<IndexerOrdersByBuyerAddressQuery> | null>;

export type ReactQueryOrdersByBuyerAddressProps = {
  client: ApolloClient<unknown>;
} & IndexerOrdersByBuyerAddressQueryVariables &
  ReactQueryBuilderResponse<ReactQueryOrdersByBuyerAddressResponse>;
