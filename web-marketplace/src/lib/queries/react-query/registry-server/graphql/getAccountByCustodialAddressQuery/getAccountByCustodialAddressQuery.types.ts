import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  AccountByCustodialAddressQuery,
  AccountByCustodialAddressQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAccountByCustodialAddressQueryResponse =
  QueryObserverOptions<AccountByCustodialAddressQuery | null>;

export type ReactQueryGetAccountByCustodialAddressQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & AccountByCustodialAddressQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAccountByCustodialAddressQueryResponse>;
