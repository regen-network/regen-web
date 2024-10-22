import {
  IndexerLastRetirementDocument,
  IndexerLastRetirementQuery,
  IndexerLastRetirementQueryVariables,
} from 'generated/indexer-graphql';

import { getLastRetirementKey } from './getLastRetirement.constants';
import {
  ReactQueryLastRetirementProps,
  ReactQueryLastRetirementResponse,
} from './getLastRetirement.types';

export const getLastRetirement = ({
  client,
  ...params
}: ReactQueryLastRetirementProps): ReactQueryLastRetirementResponse => ({
  queryKey: getLastRetirementKey(),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerLastRetirementQuery,
        IndexerLastRetirementQueryVariables
      >({
        query: IndexerLastRetirementDocument,
      });

      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  },
  ...params,
});
