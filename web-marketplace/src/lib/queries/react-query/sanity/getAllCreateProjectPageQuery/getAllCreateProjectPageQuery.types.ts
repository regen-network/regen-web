import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AllCreateProjectPageQuery } from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetAllCreateProjectPageResponse =
  QueryObserverOptions<AllCreateProjectPageQuery>;

export type ReactQueryGetAllCreateProjectPageQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryGetAllCreateProjectPageResponse>;
