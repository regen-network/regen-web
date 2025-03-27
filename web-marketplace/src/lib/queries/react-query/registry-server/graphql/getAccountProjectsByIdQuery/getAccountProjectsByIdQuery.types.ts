import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  AccountProjectsByIdQuery,
  AccountProjectsByIdQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';
import { EnglishProjectsMetadata } from '../getAllProjectsQuery/getAllProjectsQuery.types';

export type ReactQueryGetAccountProjectsByIdQueryResponse =
  QueryObserverOptions<{
    data: AccountProjectsByIdQuery;
    englishProjectsMetadata: EnglishProjectsMetadata;
  } | null>;

export type ReactQueryGetAccountProjectsByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & AccountProjectsByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetAccountProjectsByIdQueryResponse>;
