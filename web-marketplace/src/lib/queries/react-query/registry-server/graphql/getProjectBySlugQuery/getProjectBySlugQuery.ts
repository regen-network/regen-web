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
  ...params
}: ReactQueryProjectBySlugProps): ReactQueryProjectBySlugResponse => ({
  queryKey: getProjectBySlugKey(slug),
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

      await jsonLdCompactProjectMetadata(ProjectBySlug.data?.projectBySlug);

      return ProjectBySlug;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
