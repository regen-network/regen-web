import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { PartyByIdQuery, PartyByIdQueryVariables } from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetPartyByIdQueryResponse =
  QueryObserverOptions<PartyByIdQuery>;

export type ReactQueryGetPartyByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & PartyByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetPartyByIdQueryResponse>;
