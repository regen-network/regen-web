import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  AccountByAddrWithDaosQuery,
  AccountByAddrWithDaosQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAccountByAddrWithDaosQueryResponse =
  QueryObserverOptions<AccountByAddrWithDaosQuery | null>;

export type ReactQueryGetAccountByAddrWithDaosQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & AccountByAddrWithDaosQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAccountByAddrWithDaosQueryResponse>;
