import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type PrivateAccount = {
  id: string;
  email: string | null;
  google: string | null;
  google_email: string | null;
  can_use_stripe_connect: boolean;
};

export type Accounts = {
  activeAccountId: string;
  authenticatedAccounts?: Array<PrivateAccount>;
};

export type ReactQueryGetAccountsQueryResponse =
  QueryObserverOptions<Accounts | null>;

export type ReactQueryGetAccountsQueryParams =
  ReactQueryBuilderResponse<ReactQueryGetAccountsQueryResponse>;
