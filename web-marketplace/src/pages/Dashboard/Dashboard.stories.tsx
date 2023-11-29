import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Analytics from 'analytics';
import { graphql, rest } from 'msw';
import { AnalyticsProvider } from 'use-analytics';

import { apiUri } from 'lib/apiUri';
import { AuthProvider } from 'lib/auth/auth';

import Dashboard from 'pages/Dashboard';

export default {
  title: 'Registry/Dashboard',
  component: Dashboard,
};

const mockedAnalytics = Analytics({});
const mockedClient = new ApolloClient({
  uri: `${apiUri}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const MockTemplate = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <ApolloProvider client={mockedClient}>
      <AnalyticsProvider instance={mockedAnalytics}>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </AnalyticsProvider>
    </ApolloProvider>
  </QueryClientProvider>
);

export const MockedSuccess = {
  render: MockTemplate,
  parameters: {
    msw: {
      handlers: [
        rest.get(`${apiUri}/marketplace/v1/auth/accounts`, (req, res, ctx) => {
          return res(
            ctx.json({
              activeAccountId: '1',
              authenticatedAccounts: [
                {
                  id: '1',
                  email: 'some@email.com',
                },
              ],
            }),
          );
        }),
        graphql.query('AccountById', (req, res, ctx) => {
          return res(
            ctx.data({
              accountById: {
                id: '1',
                name: 'John Doe',
              },
            }),
          );
        }),
      ],
    },
  },
};
