import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetAllCreditClassesResponse =
  QueryObserverOptions<AllCreditClassQuery>;

export type ReactQueryGetAllCreditClassesParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryGetAllCreditClassesResponse>;
