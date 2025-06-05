'use client';

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { makeClient } from './makeApolloClient';

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const reactQueryClient = useQueryClient();
  useQuery(getCsrfTokenQuery({}));

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(reactQueryClient)}>
      {children}
    </ApolloNextAppProvider>
  );
}
