/* eslint-disable lingui/no-unlocalized-strings */
import { AllProjectsDocument, AllProjectsQuery } from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

import { ALL_PROJECTS_QUERY_KEY } from './getAllProjectsQuery.constants';
import {
  EnglishProjectsMetadata,
  ReactQueryGetAllProjectsParams,
  ReactQueryGetAllProjectsResponse,
} from './getAllProjectsQuery.types';

export const getAllProjectsQuery = ({
  client,
  languageCode,
  ...params
}: ReactQueryGetAllProjectsParams): ReactQueryGetAllProjectsResponse => ({
  queryKey: [ALL_PROJECTS_QUERY_KEY, languageCode],
  queryFn: async () => {
    const { data } = await client.query<AllProjectsQuery>({
      query: AllProjectsDocument,
    });

    const englishProjectsMetadata: EnglishProjectsMetadata = {};
    await Promise.all(
      data?.allProjects?.nodes?.map(async project => {
        if (project?.metadata && project?.id) {
          englishProjectsMetadata[project?.id] = await jsonLdCompact(
            project.metadata,
          );
        }
        const localizedMetadata = project?.projectTranslationsById?.nodes.find(
          translation => translation?.languageCode === languageCode,
        )?.metadata;

        if (localizedMetadata || project?.metadata) {
          project.metadata = await jsonLdCompact(
            localizedMetadata ?? project?.metadata,
          );
        }
      }) || [],
    );

    return { data, englishProjectsMetadata };
  },
  ...params,
});
