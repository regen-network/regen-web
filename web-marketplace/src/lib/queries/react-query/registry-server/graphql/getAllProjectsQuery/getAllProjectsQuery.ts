/* eslint-disable lingui/no-unlocalized-strings */
import { AllProjectsDocument, AllProjectsQuery } from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

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
  queryKey: ['AllProjectsQuery', languageCode],
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
