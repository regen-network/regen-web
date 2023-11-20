import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AccountByIdQuery, AccountByIdQueryVariables } from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAccountByIdQueryResponse =
  QueryObserverOptions<AccountByIdQuery>;

export type ReactQueryGetAccountByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & AccountByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAccountByIdQueryResponse>;
