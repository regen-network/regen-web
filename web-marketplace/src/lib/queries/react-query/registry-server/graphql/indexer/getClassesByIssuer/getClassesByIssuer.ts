import {
  IndexerClassesByIssuerDocument,
  IndexerClassesByIssuerQuery,
  IndexerClassesByIssuerQueryVariables,
} from 'generated/indexer-graphql';

import { getClassesByIssuerKey } from './getClassesByIssuer.constants';
import {
  ReactQueryClassesByIssuerProps,
  ReactQueryClassesByIssuerResponse,
} from './getClassesByIssuer.types';

export const getClassesByIssuerQuery = ({
  client,
  issuer,
  ...params
}: ReactQueryClassesByIssuerProps): ReactQueryClassesByIssuerResponse => ({
  queryKey: getClassesByIssuerKey({ issuer }),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerClassesByIssuerQuery,
        IndexerClassesByIssuerQueryVariables
      >({
        query: IndexerClassesByIssuerDocument,
        variables: { issuer },
      });

      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return null;
    }
  },
  ...params,
});
