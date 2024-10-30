import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  AccountByAddrQuery,
  AccountByAddrQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAccountByAddrQueryResponse =
  QueryObserverOptions<AccountByAddrQuery | null>;

export type ReactQueryGetAccountByAddrQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & AccountByAddrQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAccountByAddrQueryResponse>;
