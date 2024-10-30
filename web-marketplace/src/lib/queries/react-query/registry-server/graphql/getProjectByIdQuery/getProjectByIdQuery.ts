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
  languageCode,
  ...params
}: ReactQueryProjectByIdProps): ReactQueryProjectByIdResponse => ({
  queryKey: [...getProjectByIdKey(id), languageCode],
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

      const localizedMetadata =
        projectById.data?.projectById?.projectTranslationsById?.nodes.find(
          translation => translation?.languageCode === languageCode,
        )?.metadata;

      if (projectById.data?.projectById?.metadata) {
        projectById.data.projectById.metadata = await jsonLdCompact(
          localizedMetadata ?? projectById.data.projectById.metadata,
        );
      }

      const localizedDocuments =
        projectById.data?.projectById?.documentsByProjectId?.nodes.map(node => {
          const document =
            node?.documentTranslationsById?.nodes.find(
              translation => translation?.languageCode === languageCode,
            ) ?? node;

          return Object.assign({}, node, {
            name: document?.name,
            type: document?.type,
          });
        }) ?? [];

      if (projectById.data?.projectById) {
        projectById.data.projectById.documentsByProjectId = {
          nodes: localizedDocuments,
        };
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
