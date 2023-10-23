import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  GetAccountsByNameOrAddrQuery,
  GetAccountsByNameOrAddrQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAccountsByNameOrAddrQueryResponse =
  QueryObserverOptions<GetAccountsByNameOrAddrQuery | null>;

export type ReactQueryGetAccountsByNameOrAddrQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & GetAccountsByNameOrAddrQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAccountsByNameOrAddrQueryResponse>;
