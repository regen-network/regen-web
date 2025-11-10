import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  DaoByAddressQuery,
  DaoByAddressQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetDaoByAddressQueryResponse =
  QueryObserverOptions<DaoByAddressQuery | null>;

export type ReactQueryGetDaoByAddressQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & DaoByAddressQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetDaoByAddressQueryResponse>;
