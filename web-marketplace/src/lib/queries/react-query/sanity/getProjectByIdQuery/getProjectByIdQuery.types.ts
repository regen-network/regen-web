import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectByIdQuery,
  ProjectByIdQueryVariables,
} from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetProjectByIdResponse = QueryObserverOptions<{
  allProject: ProjectByIdQuery['allProject'];
}>;

type Project = ProjectByIdQuery['allProject'][0];

export type ProjectByIdItemType = Project;

export type ReactQueryGetProjectByIdQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ProjectByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetProjectByIdResponse>;
