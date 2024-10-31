import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllBuyModalOptionsQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryBuyModalOptionsResponse =
  QueryObserverOptions<AllBuyModalOptionsQuery>;

export type ReactQueryBuyModalOptionsQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryBuyModalOptionsResponse>;
