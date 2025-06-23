import {
  ProjectIdByOnChainIdDocument,
  ProjectIdByOnChainIdQuery,
  ProjectIdByOnChainIdQueryVariables,
} from 'generated/graphql';

import { getProjectIdByOnChainIdKey } from './getProjectIdByOnChainIdQuery.constants';
import {
  ReactQueryProjectIdByOnChainIdProps,
  ReactQueryProjectIdByOnChainIdResponse,
} from './getProjectIdByOnChainIdQuery.types';

export const getProjectIdByOnChainIdQuery = ({
  onChainId,
  client,
  ...params
}: ReactQueryProjectIdByOnChainIdProps): ReactQueryProjectIdByOnChainIdResponse => ({
  queryKey: getProjectIdByOnChainIdKey(onChainId),
  queryFn: async () => {
    try {
      const projectByOnChainId = await client.query<
        ProjectIdByOnChainIdQuery,
        ProjectIdByOnChainIdQueryVariables
      >({
        query: ProjectIdByOnChainIdDocument,
        variables: { onChainId },
        fetchPolicy: 'no-cache',
      });

      return projectByOnChainId;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
