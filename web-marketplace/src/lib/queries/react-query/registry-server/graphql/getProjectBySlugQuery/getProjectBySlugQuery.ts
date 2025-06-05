import {
  ProjectBySlugDocument,
  ProjectBySlugQuery,
  ProjectBySlugQueryVariables,
} from 'generated/graphql';
import { jsonLdCompactProjectMetadata } from 'lib/queries/react-query/utils/jsonLdCompactProjectMetadata';

import { getProjectBySlugKey } from './getProjectBySlugQuery.constants';
import {
  ReactQueryProjectBySlugProps,
  ReactQueryProjectBySlugResponse,
} from './getProjectBySlugQuery.types';

export const getProjectBySlugQuery = ({
  slug,
  client,
  languageCode,
  ...params
}: ReactQueryProjectBySlugProps): ReactQueryProjectBySlugResponse => ({
  queryKey: [...getProjectBySlugKey(slug), languageCode],
  queryFn: async () => {
    try {
      const ProjectBySlug = await client.query<
        ProjectBySlugQuery,
        ProjectBySlugQueryVariables
      >({
        query: ProjectBySlugDocument,
        variables: { slug },
        fetchPolicy: 'no-cache',
      });

      await jsonLdCompactProjectMetadata({
        project: ProjectBySlug.data?.projectBySlug,
        languageCode,
      });

      const localizedDocuments =
        ProjectBySlug.data?.projectBySlug?.documentsByProjectId?.nodes.map(
          node => {
            const document =
              node?.documentTranslationsById?.nodes.find(
                translation => translation?.languageCode === languageCode,
              ) ?? node;

            return Object.assign({}, node, {
              name: document?.name,
              type: document?.type,
            });
          },
        ) ?? [];

      if (ProjectBySlug.data?.projectBySlug) {
        ProjectBySlug.data.projectBySlug.documentsByProjectId = {
          nodes: localizedDocuments,
        };
      }

      return ProjectBySlug;
    } catch (e) {
      console.log('e', e);

      return null;
    }
  },
  ...params,
});
