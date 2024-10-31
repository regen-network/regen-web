import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  SdgByIriQuery,
  SdgByIriQueryVariables,
} from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQuerySdgByIriQueryResponse =
  QueryObserverOptions<SdgByIriQuery>;

export type ReactQuerySdgByIriQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & SdgByIriQueryVariables &
  ReactQueryBuilderResponse<ReactQuerySdgByIriQueryResponse>;
