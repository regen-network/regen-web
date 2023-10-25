import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  AccountProjectsByAddrQuery,
  AccountProjectsByAddrQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAccountProjectsByAddrQueryResponse =
  QueryObserverOptions<AccountProjectsByAddrQuery | null>;

export type ReactQueryGetAccountProjectsByAddrQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & AccountProjectsByAddrQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAccountProjectsByAddrQueryResponse>;
