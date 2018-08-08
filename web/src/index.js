import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import theme from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from 'apollo-link-http';
import store from './store';
import makeMainRoutes from './routes';

const customFetch = (uri, options) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  return fetch(uri, options);
};

const httpLink = new HttpLink({
  uri: "/graphql",
  fetch: customFetch,
});

const client = new ApolloClient({
  link: httpLink,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
    				{ makeMainRoutes() }
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
