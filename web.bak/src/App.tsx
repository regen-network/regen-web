// React
import * as React from 'react';
import { View } from 'react-native';

// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom';

// GraphQL
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Cryptography
// import * as Sodium from 'libsodium-wrappers';

// App
import Home from './Home';
import TargetPage from './TargetPage';
import SubmissionPage from './SubmissionPage';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
    }
  });
  return forward ? forward(operation) : null;
});

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: concat(authMiddleware, new HttpLink()),
  cache: new InMemoryCache()
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <View>
            <Route exact={true} path="/" component={Home} />
            <Route path="/target/:id" component={TargetPage} />
            <Route path="/submission/:id" component={SubmissionPage} />
          </View>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
