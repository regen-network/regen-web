import {
  IndexerAllEcocreditTxesDocument,
  IndexerAllEcocreditTxesQuery,
  IndexerAllEcocreditTxesQueryVariables,
} from 'generated/indexer-graphql';

import { getAllEcocreditTxesKey } from './getAllEcocreditTxes.constants';
import {
  ReactQueryAllEcocreditTxesProps,
  ReactQueryAllEcocreditTxesResponse,
} from './getAllEcocreditTxes.types';

export const getAllEcocreditTxesQuery = ({
  client,
  first,
  offset,
  ...params
}: ReactQueryAllEcocreditTxesProps): ReactQueryAllEcocreditTxesResponse => ({
  queryKey: getAllEcocreditTxesKey({ first, offset }),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerAllEcocreditTxesQuery,
        IndexerAllEcocreditTxesQueryVariables
      >({
        query: IndexerAllEcocreditTxesDocument,
        variables: {
          first,
          offset,
        },
      });

      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  ...params,
});
