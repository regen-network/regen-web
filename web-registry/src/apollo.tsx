import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import getApiUri from 'lib/apiUri';

interface AuthApolloProviderProps {
  children?: any;
}

export const AuthApolloProvider = ({
  children,
}: AuthApolloProviderProps): any => {
  const baseUri = getApiUri();

  // https://www.apollographql.com/docs/react/networking/authentication
  const httpLink = createHttpLink({
    uri: `${baseUri}/graphql`,
    credentials: 'include',
  });

  // https://www.apollographql.com/docs/react/api/link/apollo-link-context/#overview
  const authLink = setContext(
    (_, { headers }) =>
      new Promise((success, fail) => {
        fetch(`${baseUri}/csrfToken`, {
          method: 'GET',
          credentials: 'include',
        })
          .then(resp => {
            resp.json().then(({ token }) => {
              success({
                headers: {
                  ...headers,
                  'X-CSRF-TOKEN': token,
                },
              });
            });
          })
          .catch(err => {
            fail(err);
          });
      }),
  );

  const link = authLink.concat(httpLink);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
