import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import {
  ShaclGraphByUriQuery,
  ShaclGraphByUriQueryVariables,
} from 'generated/graphql';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryShaclGraphByUriResponse =
  QueryObserverOptions<ApolloQueryResult<ShaclGraphByUriQuery> | null>;

export type ReactQueryShaclGraphByUriProps = {
  client: ApolloClient<object>;
} & ShaclGraphByUriQueryVariables &
  ReactQueryBuilderResponse<ReactQueryShaclGraphByUriResponse>;
