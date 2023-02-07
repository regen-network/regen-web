import {
  ProjectByIdDocument,
  ProjectByIdQuery,
  ProjectByIdQueryVariables,
} from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

import { getProjectByIdKey } from './getProjectByIdQuery.constants';
import {
  ReactQueryProjectByIdProps,
  ReactQueryProjectByIdResponse,
} from './getProjectByIdQuery.types';

export const getProjectByIdQuery = ({
  id,
  client,
  ...params
}: ReactQueryProjectByIdProps): ReactQueryProjectByIdResponse => ({
  queryKey: getProjectByIdKey(id),
  queryFn: async () => {
    try {
      const projectById = await client.query<
        ProjectByIdQuery,
        ProjectByIdQueryVariables
      >({
        query: ProjectByIdDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
      });

      if (projectById.data?.projectById?.metadata) {
        projectById.data.projectById.metadata = await jsonLdCompact(
          projectById.data.projectById.metadata,
        );
      }

      return projectById;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
