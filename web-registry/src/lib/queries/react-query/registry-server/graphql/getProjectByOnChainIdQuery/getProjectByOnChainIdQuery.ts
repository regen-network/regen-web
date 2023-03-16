import {
  ProjectByOnChainIdDocument,
  ProjectByOnChainIdQuery,
  ProjectByOnChainIdQueryVariables,
} from 'generated/graphql';
import { jsonLdCompactProjectMetadata } from 'lib/queries/react-query/utils/jsonLdCompactProjectMetadata';

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

      await jsonLdCompactProjectMetadata(
        projectByOnChainId.data?.projectByOnChainId,
      );

      return projectByOnChainId;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
