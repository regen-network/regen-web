import {
  IndexerRetirementByTxHashDocument,
  IndexerRetirementByTxHashQuery,
  IndexerRetirementByTxHashQueryVariables,
} from 'generated/indexer-graphql';

import { getRetirementByTxHashKey } from './getRetirementByTxHash.constants';
import {
  ReactQueryRetirementByTxHashProps,
  ReactQueryRetirementByTxHashResponse,
} from './getRetirementByTxHash.types';

export const getRetirementByTxHash = ({
  client,
  txHash,
  ...params
}: ReactQueryRetirementByTxHashProps): ReactQueryRetirementByTxHashResponse => ({
  queryKey: getRetirementByTxHashKey(txHash),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerRetirementByTxHashQuery,
        IndexerRetirementByTxHashQueryVariables
      >({
        query: IndexerRetirementByTxHashDocument,
        variables: {
          txHash,
        },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
