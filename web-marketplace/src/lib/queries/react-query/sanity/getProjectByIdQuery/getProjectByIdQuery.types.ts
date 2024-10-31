import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ProjectByIdQuery,
  ProjectByIdQueryVariables,
  TerrasosProjectByIdQuery,
} from 'generated/sanity-graphql';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryGetProjectByIdResponse = QueryObserverOptions<{
  allProject:
    | ProjectByIdQuery['allProject']
    | TerrasosProjectByIdQuery['allTerrasosProject'];
}>;

type Project = ProjectByIdQuery['allProject'][0];
type TerrasosProject = TerrasosProjectByIdQuery['allTerrasosProject'][0];

export type ProjectByIdItemType = TerrasosProject | Project;

export type ReactQueryGetProjectByIdQueryParams = {
  sanityClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
} & ProjectByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetProjectByIdResponse>;

export const isTerrasosProject = (
  project?: ProjectByIdItemType,
): project is TerrasosProject => {
  if (!project) return false;
  return 'complianceCredits' in project;
};
