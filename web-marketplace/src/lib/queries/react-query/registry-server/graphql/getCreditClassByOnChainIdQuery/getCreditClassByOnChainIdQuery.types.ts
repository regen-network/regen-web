import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  CreditClassByOnChainIdQuery,
  CreditClassByOnChainIdQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryCreditClassByOnChainIdResponse =
  QueryObserverOptions<ApolloQueryResult<CreditClassByOnChainIdQuery> | null>;

export type ReactQueryCreditClassByOnChainIdProps = {
  client: ApolloClient<unknown>;
} & CreditClassByOnChainIdQueryVariables &
  ReactQueryBuilderResponse<ReactQueryCreditClassByOnChainIdResponse>;
