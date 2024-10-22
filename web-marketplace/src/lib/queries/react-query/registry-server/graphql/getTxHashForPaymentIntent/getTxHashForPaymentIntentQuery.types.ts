import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  GetTxHashForPaymentIntentQuery,
  GetTxHashForPaymentIntentQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryGetTxHashForPaymentIntentResponse =
  QueryObserverOptions<ApolloQueryResult<GetTxHashForPaymentIntentQuery> | null>;

export type ReactQueryGetTxHashForPaymentIntentProps = {
  client: ApolloClient<object>;
} & GetTxHashForPaymentIntentQueryVariables &
  ReactQueryBuilderResponse<ReactQueryGetTxHashForPaymentIntentResponse>;
