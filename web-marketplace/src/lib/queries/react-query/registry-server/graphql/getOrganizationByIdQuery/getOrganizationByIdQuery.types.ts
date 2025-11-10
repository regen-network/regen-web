import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  OrganizationByIdQuery,
  OrganizationByIdQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetOrganizationByIdQueryResponse =
  QueryObserverOptions<OrganizationByIdQuery | null>;

export type ReactQueryGetOrganizationByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & OrganizationByIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetOrganizationByIdQueryResponse>;
