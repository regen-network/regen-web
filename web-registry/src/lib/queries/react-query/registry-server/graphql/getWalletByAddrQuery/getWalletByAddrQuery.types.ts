import { ApolloClient } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  WalletByAddrQuery,
  WalletByAddrQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetWalletByAddrQueryResponse =
  QueryObserverOptions<WalletByAddrQuery>;

export type ReactQueryGetWalletByAddrQueryParams = {
  client: ApolloClient<unknown>;
} & WalletByAddrQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetWalletByAddrQueryResponse>;
