import { createContext, useContext } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';

import { AccountByIdQuery } from 'generated/graphql';
import { getAccountsQuery } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

export type AuthContextType = {
  error?: unknown;
  activeAccountId?: string;
  authenticatedAccountIds?: string[];
  activeAccount?: AccountByIdQuery['accountById'];
  authenticatedAccounts?: Array<AccountByIdQuery['accountById']>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ loading: false });

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data, isFetching } = useQuery(
    getAccountsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient,
    }),
  );
  const activeAccountId = data?.activeAccountId;
  const authenticatedAccountIds = data?.authenticatedAccountIds;
  console.log('authenticatedAccountIds', authenticatedAccountIds);
  const authenticatedAccountsResult = useQueries({
    queries:
      authenticatedAccountIds?.map(id =>
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
  const authenticatedAccounts = authenticatedAccountsResult?.map(
    result => result.data?.accountById,
  );
  const activeAccount = authenticatedAccounts.find(
    account => account?.id === activeAccountId,
  );

  return (
    <AuthContext.Provider
      value={{
        activeAccountId,
        activeAccount,
        authenticatedAccountIds,
        authenticatedAccounts,
        loading: isFetching || isAuthenticatedAccountsFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
