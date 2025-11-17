import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  OrganizationProjectsByDaoAddressQuery,
  OrganizationProjectsByDaoAddressQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetOrganizationProjectsByDaoAddressQueryResponse =
  QueryObserverOptions<OrganizationProjectsByDaoAddressQuery | null>;

export type ReactQueryGetOrganizationProjectsByDaoAddressQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & OrganizationProjectsByDaoAddressQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetOrganizationProjectsByDaoAddressQueryResponse>;
