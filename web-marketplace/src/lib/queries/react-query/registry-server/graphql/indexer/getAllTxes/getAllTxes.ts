import {
  IndexerAllTxesDocument,
  IndexerAllTxesQuery,
  IndexerAllTxesQueryVariables,
  TxesOrderBy,
} from 'generated/indexer-graphql';

import { getAllTxesKey } from './getAllTxes.constants';
import {
  ReactQueryAllTxesProps,
  ReactQueryAllTxesResponse,
} from './getAllTxes.types';

export const getAllTxes = ({
  client,
  first,
  offset,
  orderBy = TxesOrderBy.BlockHeightDesc,
  ...params
}: ReactQueryAllTxesProps): ReactQueryAllTxesResponse => ({
  queryKey: getAllTxesKey({ first, offset, orderBy }),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerAllTxesQuery,
        IndexerAllTxesQueryVariables
      >({
        query: IndexerAllTxesDocument,
        variables: {
          first,
          offset,
          orderBy,
        },
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
