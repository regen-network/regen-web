import { createContext, useContext } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';

import { AccountByIdQuery } from 'generated/graphql';
import { getAccountsQuery } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery';
import { PrivateAccount } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

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

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data, isFetching } = useQuery(getAccountsQuery({}));
  const activeAccountId = data?.activeAccountId;
  const privAuthenticatedAccounts = data?.authenticatedAccounts;

  const authenticatedAccountsResult = useQueries({
    queries:
      privAuthenticatedAccounts?.map(({ id }) =>
        getAccountByIdQuery({
          client: graphqlClient,
          enabled: !!graphqlClient,
          id,
        }),
      ) || [],
  });
  const isAuthenticatedAccountsFetching = authenticatedAccountsResult.some(
    authenticatedAccountsQuery => authenticatedAccountsQuery.isFetching,
  );
  const authenticatedAccounts = authenticatedAccountsResult.map(
    result => result.data?.accountById,
  );
  const activeAccount = authenticatedAccounts.find(
    account => account?.id === activeAccountId,
  );
  const privActiveAccount = privAuthenticatedAccounts?.find(
    account => account?.id === activeAccountId,
  );

  return (
    <AuthContext.Provider
      value={{
        activeAccountId,
        activeAccount,
        authenticatedAccountIds: privAuthenticatedAccounts?.map(({ id }) => id),
        authenticatedAccounts,
        privActiveAccount,
        privAuthenticatedAccounts,
        loading: isFetching || isAuthenticatedAccountsFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
