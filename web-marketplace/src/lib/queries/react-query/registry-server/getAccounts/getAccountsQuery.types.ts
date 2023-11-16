import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

type Accounts = {
  activeAccountId: string;
  authenticatedAccountIds: string[];
};

export type ReactQueryGetAccountsQueryResponse =
  QueryObserverOptions<Accounts | null>;

export type ReactQueryGetAccountsQueryParams =
  ReactQueryBuilderResponse<ReactQueryGetAccountsQueryResponse>;
