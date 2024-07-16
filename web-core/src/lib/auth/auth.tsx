import { createContext, useContext } from 'react';

import { AccountByIdQuery } from 'generated/graphql';
import { PrivateAccount } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';

export type AuthContextType = {
  error?: unknown;
  activeAccountId?: string;
  authenticatedAccountIds?: string[];
  activeAccount?: AccountByIdQuery['accountById'];
  privActiveAccount?: PrivateAccount;
  authenticatedAccounts?: AccountByIdQuery['accountById'][];
  privAuthenticatedAccounts?: PrivateAccount[];
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ loading: false });

export const useAuth = (): AuthContextType => useContext(AuthContext);
