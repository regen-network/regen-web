import {
  IndexerRetirementByNodeIdDocument,
  IndexerRetirementByNodeIdQuery,
  IndexerRetirementByNodeIdQueryVariables,
} from 'generated/indexer-graphql';

import { getRetirementByNodeIdKey } from './getRetirementByNodeId.constants';
import {
  ReactQueryRetirementByNodeIdProps,
  ReactQueryRetirementByNodeIdResponse,
} from './getRetirementByNodeId.types';

export const getRetirementByNodeId = ({
  client,
  nodeId,
  ...params
}: ReactQueryRetirementByNodeIdProps): ReactQueryRetirementByNodeIdResponse => ({
  queryKey: getRetirementByNodeIdKey(nodeId),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerRetirementByNodeIdQuery,
        IndexerRetirementByNodeIdQueryVariables
      >({
        query: IndexerRetirementByNodeIdDocument,
        variables: {
          nodeId,
        },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
