import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';
import { NodeObject } from 'jsonld';

import { AllProjectsQuery } from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetAllProjectsResponse = QueryObserverOptions<{
  data: AllProjectsQuery;
  englishProjectsMetadata: { [id: string]: NodeObject };
}>;

export type ReactQueryGetAllProjectsParams = {
  client: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ReactQueryBuilderResponse<ReactQueryGetAllProjectsResponse>;
