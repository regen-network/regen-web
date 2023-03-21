import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { PartyByAddrQuery, PartyByAddrQueryVariables } from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetPartyByAddrQueryResponse =
  QueryObserverOptions<PartyByAddrQuery>;

export type ReactQueryGetPartyByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & PartyByAddrQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetPartyByAddrQueryResponse>;
