import {
  IndexerAllTxesCountDocument,
  IndexerAllTxesCountQuery,
  IndexerAllTxesCountQueryVariables,
} from 'generated/indexer-graphql';

import { getAllTxesCountKey } from './getAllTxesCount.constants';
import {
  ReactQueryAllTxesCountProps,
  ReactQueryAllTxesCountResponse,
} from './getAllTxesCount.types';

export const getAllTxesCount = ({
  client,
  ...params
}: ReactQueryAllTxesCountProps): ReactQueryAllTxesCountResponse => ({
  queryKey: getAllTxesCountKey(),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerAllTxesCountQuery,
        IndexerAllTxesCountQueryVariables
      >({
        query: IndexerAllTxesCountDocument,
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
