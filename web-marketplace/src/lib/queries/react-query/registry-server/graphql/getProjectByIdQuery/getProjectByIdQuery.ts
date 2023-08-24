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
        projectById.data.projectById.metadata = await jsonLdCompact({
          // NOTE: We set the context here to prevent a prefix confusion
          // error when no context is provided and field values with the
          // prefixes are present within the project metadata.
          '@context': {
            schema: 'http://schema.org/',
            regen: 'https://schema.regen.network#',
            qudt: 'http://qudt.org/schema/qudt/',
            unit: 'http://qudt.org/vocab/unit/',
            xsd: 'http://www.w3.org/2001/XMLSchema#',
          },
          ...projectById.data.projectById.metadata,
        });
      }

      return projectById;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return null;
    }
  },
  ...params,
});
