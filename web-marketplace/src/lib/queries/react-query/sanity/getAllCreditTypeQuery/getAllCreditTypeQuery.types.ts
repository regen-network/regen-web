import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllCreditTypeQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetAllCreditTypeResponse =
  QueryObserverOptions<AllCreditTypeQuery>;

export type ReactQueryGetAllCreditTypeParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryGetAllCreditTypeResponse>;
