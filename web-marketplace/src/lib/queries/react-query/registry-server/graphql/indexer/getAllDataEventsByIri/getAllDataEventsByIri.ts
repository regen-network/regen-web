import {
  IndexerAllDataEventsByIriDocument,
  IndexerAllDataEventsByIriQuery,
  IndexerAllDataEventsByIriQueryVariables,
  UnifiedDataEventsOrderBy,
} from 'generated/indexer-graphql';

import { getAllDataEventsByIriQueryKey } from './getAllDataEventsByIri.constants';
import {
  ReactQueryAllDataEventsByIriProps,
  ReactQueryAllDataEventsByIriResponse,
} from './getAllDataEventsByIri.types';

export const getAllDataEventsByIriQuery = ({
  client,
  iri,
  orderBy = UnifiedDataEventsOrderBy.TimestampDesc,
  eventTypeIncludes,
  ...params
}: ReactQueryAllDataEventsByIriProps): ReactQueryAllDataEventsByIriResponse => ({
  queryKey: getAllDataEventsByIriQueryKey(iri, eventTypeIncludes),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerAllDataEventsByIriQuery,
        IndexerAllDataEventsByIriQueryVariables
      >({
        query: IndexerAllDataEventsByIriDocument,
        variables: {
          iri,
          eventTypeIncludes,
          orderBy,
        },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
