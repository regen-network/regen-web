import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllProjectPageQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetAllProjectPageResponse =
  QueryObserverOptions<AllProjectPageQuery>;

export type ReactQueryGetAllProjectPageQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryGetAllProjectPageResponse>;
