import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

type Accounts = {
  activeAccountId: string;
  activeAccountIds: string[];
};

export type ReactQueryGetAccountsQueryResponse =
  QueryObserverOptions<Accounts | null>;

export type ReactQueryGetPartyByIdQueryParams = {
  client: ApolloClient<NormalizedCacheObject>;
} & ReactQueryBuilderResponse<ReactQueryGetAccountsQueryResponse>;
