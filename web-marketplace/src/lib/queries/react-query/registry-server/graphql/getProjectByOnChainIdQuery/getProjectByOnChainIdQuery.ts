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
  languageCode,
  ...params
}: ReactQueryProjectByOnChainIdProps): ReactQueryProjectByOnChainIdResponse => ({
  queryKey: getProjectByOnChainIdKey(onChainId, languageCode),
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

      await jsonLdCompactProjectMetadata({
        project: projectByOnChainId.data?.projectByOnChainId,
        languageCode,
      });

      const localizedDocuments =
        projectByOnChainId.data?.projectByOnChainId?.documentsByProjectId?.nodes.map(
          node => {
            const document =
              node?.documentTranslationsById?.nodes.find(
                translation => translation?.languageCode === languageCode,
              ) ?? node;

            return Object.assign({}, node, {
              name: document?.name,
            });
          },
        ) ?? [];

      if (projectByOnChainId.data?.projectByOnChainId) {
        projectByOnChainId.data.projectByOnChainId.documentsByProjectId = {
          nodes: localizedDocuments,
        };
      }

      return projectByOnChainId;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
