import {
  IndexerAllDataEventsByIriDocument,
  IndexerAllDataEventsByIriQuery,
  IndexerAllDataEventsByIriQueryVariables,
} from 'generated/indexer-graphql';

import { getAllDataEventsByIriQueryKey } from './getAllDataEventsByIri.constants';
import {
  ReactQueryAllDataEventsByIriProps,
  ReactQueryAllDataEventsByIriResponse,
} from './getAllDataEventsByIri.types';

export const getAllDataEventsByIriQuery = ({
  client,
  iri,
  ...params
}: ReactQueryAllDataEventsByIriProps): ReactQueryAllDataEventsByIriResponse => ({
  queryKey: getAllDataEventsByIriQueryKey(iri),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerAllDataEventsByIriQuery,
        IndexerAllDataEventsByIriQueryVariables
      >({
        query: IndexerAllDataEventsByIriDocument,
        variables: {
          iri,
        },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
