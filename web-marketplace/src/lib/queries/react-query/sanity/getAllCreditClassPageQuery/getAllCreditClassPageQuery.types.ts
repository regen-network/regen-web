import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllCreditClassPageQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetAllCreditClassPageResponse =
  QueryObserverOptions<AllCreditClassPageQuery>;

export type ReactQueryGetAllCreditClassPageQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryGetAllCreditClassPageResponse>;
