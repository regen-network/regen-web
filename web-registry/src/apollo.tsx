import { ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useQuery } from '@tanstack/react-query';

<<<<<<< HEAD
import getApiUri from 'lib/apiUri';
import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
=======
import { apiUri } from './lib/apiUri';
>>>>>>> 00dd31ce (feat: add login fn)

interface AuthApolloProviderProps {
  apolloClientFactory: ApolloClientFactory;
  children?: any;
}

export const AuthApolloProvider = ({
  apolloClientFactory,
  children,
}: AuthApolloProviderProps): any => {
<<<<<<< HEAD
  const baseUri = getApiUri();
  const query = useQuery({
    queryKey: ['csrfToken'],
    queryFn: async () => {
      const resp = await fetch(`${baseUri}/csrfToken`, {
        method: 'GET',
        credentials: 'include',
      });
      const { token } = await resp.json();
      return { token, headers: resp.headers };
    },
  });

  // https://www.apollographql.com/docs/react/networking/authentication
  const httpLink = createHttpLink({
    uri: `${baseUri}/graphql`,
    credentials: 'include',
  });
  // https://www.apollographql.com/docs/react/api/link/apollo-link-context/#overview
  const authLink = setContext(
    (_, { headers }) =>
      new Promise((success, fail) => {
        if (query.isFetched && query.data) {
          success({
=======
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const login = useCallback(async (): Promise<void> => {
    try {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        try {
          await fetch(`${apiUri}/auth/login`, {
>>>>>>> 00dd31ce (feat: add login fn)
            headers: {
              ...headers,
              'X-CSRF-TOKEN': query.data.token,
            },
          });
        }
      }),
  );

<<<<<<< HEAD
  const link = authLink.concat(httpLink);
  apolloClientFactory.prepare({
=======
  useEffect(() => {
    login();
  }, [login]);

  if (isLoading) {
    return <div></div>;
  }

  const httpLink = new HttpLink({
    uri: `${apiUri}/graphql`,
    credentials: 'include',
  });

  const withToken = setContext(async () => {
    // needed on first login
    // TODO find more efficient solution at Auth0Provider level
    await login();
    // Get token or get refreshed token
    const token = isAuthenticated ? await getAccessTokenSilently() : null;
    return { token };
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const { token } = operation.getContext();
    operation.setContext(() => ({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }));
    return forward(operation);
  });

  const link = ApolloLink.from([withToken, authMiddleware.concat(httpLink)]);

  const client = new ApolloClient({
>>>>>>> b7dd8ebe (refactor: mv login to existing wallet provider)
    cache: new InMemoryCache(),
    link,
  });
  return (
    <ApolloProvider client={apolloClientFactory.getClient()}>
      {children}
    </ApolloProvider>
  );
};
