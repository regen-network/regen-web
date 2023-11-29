import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { toBase64 } from '@cosmjs/encoding';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Analytics from 'analytics';
import { graphql, rest } from 'msw';
import { AnalyticsProvider } from 'use-analytics';

import { LedgerProvider } from 'ledger';
import { apiUri } from 'lib/apiUri';
import { AuthProvider } from 'lib/auth/auth';

import Home from 'pages/Home';

export default {
  title: 'Registry/Home',
  component: Home,
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
          <LedgerProvider>
            <Home />
          </LedgerProvider>
        </AuthProvider>
      </AnalyticsProvider>
    </ApolloProvider>
  </QueryClientProvider>
);

const sanity = graphql.link(
  `https://${import.meta.env.VITE_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${
    import.meta.env.VITE_SANITY_DATASET
  }/${import.meta.env.VITE_SANITY_TAG}`,
);

export const MockedSuccess = {
  render: MockTemplate,
  parameters: {
    msw: {
      handlers: [
        sanity.query('AllCreditClass', req => {
          console.log('sanity AllCreditClass');
        }),
        rest.post(`${apiUri}/ledger`, async (req, res, ctx) => {
          // Decode request to get JSON-RPC params path = query name
          const arr = await req.arrayBuffer();
          var strValue = new TextDecoder().decode(arr);
          const jsonValue = JSON.parse(strValue);
          const path = jsonValue?.params?.path;

          if (path === '/regen.ecocredit.v1.Query/Projects') {
            const response: QueryProjectsResponse = {
              $type: 'regen.ecocredit.v1.QueryProjectsResponse',
              projects: [
                {
                  $type: 'regen.ecocredit.v1.ProjectInfo',
                  admin: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
                  classId: 'C01',
                  id: 'C01-001',
                  jurisdiction: 'US',
                  metadata:
                    'regen:13toVg16x35KSZVhtWLQqaPkhaopb66FtjYi5UzUgRHCujU2fKKMruj.rdf',
                  referenceId: '',
                },
                {
                  $type: 'regen.ecocredit.v1.ProjectInfo',
                  admin: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
                  classId: 'C01',
                  id: 'C01-002',
                  jurisdiction: 'US',
                  metadata: 'regen:test.rdf',
                  referenceId: '',
                },
              ],
            };

            return res(
              ctx.json({
                id: jsonValue?.id,
                jsonrpc: '2.0',
                result: {
                  response: {
                    value: toBase64(
                      QueryProjectsResponse.encode(response).finish(),
                    ),
                  },
                },
              }),
            );
          }
        }),
      ],
    },
  },
};
