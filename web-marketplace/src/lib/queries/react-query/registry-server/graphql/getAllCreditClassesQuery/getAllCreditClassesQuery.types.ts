import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllCreditClassesQuery } from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAllCreditClassesResponse =
  QueryObserverOptions<AllCreditClassesQuery>;

export type ReactQueryGetAllCreditClassesParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryGetAllCreditClassesResponse>;
