import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import theme from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import store from './store';
import makeMainRoutes from './routes';

const client = new ApolloClient({
  uri: "/graphql",
  request: async (operation) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log('got token');
      console.log(token);
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  }
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
