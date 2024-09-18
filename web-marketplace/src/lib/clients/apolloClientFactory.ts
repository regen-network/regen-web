/* eslint-disable lingui/no-unlocalized-strings */
import { ApolloClient, ApolloClientOptions } from '@apollo/client';

type ClientType = ApolloClient<unknown> | null;

interface ApolloClientFactoryI {
  client: ClientType;
}

export class ApolloClientFactory implements ApolloClientFactoryI {
  client: ClientType = null;
  prepare(options: ApolloClientOptions<unknown>) {
    this.client = new ApolloClient(options);
  }
  getClient() {
    if (!this.client) {
      throw new Error('error initializing apollo client');
    }
    return this.client;
  }
}

export const apolloClientFactory = new ApolloClientFactory();
