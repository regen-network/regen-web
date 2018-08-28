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
import createBrowserHistory from 'history/createBrowserHistory';
import makeMainRoutes from './routes';
import { actions as authActions } from './actions/auth';
const { getValidToken, handleAuthentication } = authActions;

const client = new ApolloClient({
  uri: "/graphql",
  request: async (operation) => {
    const token = getValidToken();
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  }
});

const history = createBrowserHistory();

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
    				{ makeMainRoutes(history) }
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

async function init() {
  const {pathname, hash, search, state} = history.location;
  if (/access_token|id_token|error/.test(hash)) {
    await handleAuthentication();
    history.replace({pathname, search, state});
  }
  ReactDOM.render(<Root />, document.getElementById('root'));
  registerServiceWorker();
}

init();
