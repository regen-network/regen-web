import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllProjectRatingQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryAllProjectRatingQueryResponse =
  QueryObserverOptions<AllProjectRatingQuery>;

export type ReactQueryAllProjectRatingQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryAllProjectRatingQueryResponse>;
