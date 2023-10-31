import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  AccountProjectsByIdQuery,
  AccountProjectsByIdQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAccountProjectsByIdQueryResponse =
  QueryObserverOptions<AccountProjectsByIdQuery | null>;

export type ReactQueryGetAccountProjectsByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & AccountProjectsByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAccountProjectsByIdQueryResponse>;
