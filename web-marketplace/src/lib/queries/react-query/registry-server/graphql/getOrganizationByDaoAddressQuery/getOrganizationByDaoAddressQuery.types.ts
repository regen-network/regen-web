import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  OrganizationByDaoAddressQuery,
  OrganizationByDaoAddressQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetOrganizationByDaoAddressQueryResponse =
  QueryObserverOptions<OrganizationByDaoAddressQuery | null>;

export type ReactQueryGetOrganizationByDaoAddressQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & OrganizationByDaoAddressQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetOrganizationByDaoAddressQueryResponse>;
