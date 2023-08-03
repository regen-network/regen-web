import {
  IndexerAllRetirementsByOwnerDocument,
  IndexerAllRetirementsByOwnerQuery,
  IndexerAllRetirementsByOwnerQueryVariables,
} from 'generated/indexer-graphql';

import { getAllRetirementsByOwnerQueryKey } from './getAllRetirementsByOwner.constants';
import {
  ReactQueryAllRetirementsByOwnerProps,
  ReactQueryAllRetirementsByOwnerResponse,
} from './getAllRetirementsByOwner.types';

export const getAllRetirementsByOwnerQuery = ({
  client,
  owner,
  orderBy,
  ...params
}: ReactQueryAllRetirementsByOwnerProps): ReactQueryAllRetirementsByOwnerResponse => ({
  queryKey: getAllRetirementsByOwnerQueryKey(owner),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerAllRetirementsByOwnerQuery,
        IndexerAllRetirementsByOwnerQueryVariables
      >({
        query: IndexerAllRetirementsByOwnerDocument,
        variables: {
          owner,
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
