import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  PartiesByAccountIdQuery,
  PartiesByAccountIdQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetPartiesByAccountIdQueryResponse =
  QueryObserverOptions<PartiesByAccountIdQuery | null>;

export type ReactQueryGetPartyByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & PartiesByAccountIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetPartiesByAccountIdQueryResponse>;
