import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  GetPartiesByNameOrAddrQuery,
  GetPartiesByNameOrAddrQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetPartiesByNameOrAddrQueryResponse =
  QueryObserverOptions<GetPartiesByNameOrAddrQuery | null>;

export type ReactQueryGetPartyByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & GetPartiesByNameOrAddrQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetPartiesByNameOrAddrQueryResponse>;
