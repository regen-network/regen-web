import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllCreditCertificationQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryAllCreditCertificationQueryResponse =
  QueryObserverOptions<AllCreditCertificationQuery>;

export type ReactQueryAllCreditCertificationQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryAllCreditCertificationQueryResponse>;
