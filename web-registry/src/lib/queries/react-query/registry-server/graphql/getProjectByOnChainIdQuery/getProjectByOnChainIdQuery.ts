import {
  ProjectByOnChainIdDocument,
  ProjectByOnChainIdQuery,
  ProjectByOnChainIdQueryVariables,
} from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

import { getProjectByOnChainIdKey } from './getProjectByOnChainIdQuery.constants';
import {
  ReactQueryProjectByOnChainIdProps,
  ReactQueryProjectByOnChainIdResponse,
} from './getProjectByOnChainIdQuery.types';

export const getProjectByOnChainIdQuery = ({
  onChainId,
  client,
  ...params
}: ReactQueryProjectByOnChainIdProps): ReactQueryProjectByOnChainIdResponse => ({
  queryKey: getProjectByOnChainIdKey(onChainId),
  queryFn: async () => {
    try {
      const projectByOnChainId = await client.query<
        ProjectByOnChainIdQuery,
        ProjectByOnChainIdQueryVariables
      >({
        query: ProjectByOnChainIdDocument,
        variables: { onChainId },
        fetchPolicy: 'no-cache',
      });

      if (projectByOnChainId.data?.projectByOnChainId?.metadata) {
        projectByOnChainId.data.projectByOnChainId.metadata =
          await jsonLdCompact(
            projectByOnChainId.data.projectByOnChainId.metadata,
          );
      }

      return projectByOnChainId;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
