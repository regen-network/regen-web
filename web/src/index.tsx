import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: process.env.API_URI || 'http://localhost:5000/graphql',
  // request: async operation => {
  //   const token = getValidToken();
  //   if (token) {
  //     operation.setContext({
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   }
  // },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider injectFonts>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
