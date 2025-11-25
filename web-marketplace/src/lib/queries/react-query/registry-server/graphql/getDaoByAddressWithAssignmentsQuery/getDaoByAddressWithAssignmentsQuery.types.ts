import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  DaoByAddressWithAssignmentsQuery,
  DaoByAddressWithAssignmentsQueryVariables,
} from 'generated/graphql';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetDaoByAddressWithAssignmentsQueryResponse =
  QueryObserverOptions<DaoByAddressWithAssignmentsQuery | null>;

export type ReactQueryGetDaoByAddressWithAssignmentsQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & DaoByAddressWithAssignmentsQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetDaoByAddressWithAssignmentsQueryResponse>;
