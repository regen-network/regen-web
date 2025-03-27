import {
  AccountProjectsByIdDocument,
  AccountProjectsByIdQuery,
} from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

import { EnglishProjectsMetadata } from '../getAllProjectsQuery/getAllProjectsQuery.types';
import {
  ReactQueryGetAccountProjectsByIdQueryParams,
  ReactQueryGetAccountProjectsByIdQueryResponse,
} from './getAccountProjectsByIdQuery.types';
import { getAccountProjectsByIdQueryKey } from './getAccountProjectsByIdQuery.utils';

export const getAccountProjectsByIdQuery = ({
  client,
  languageCode,
  ...params
}: ReactQueryGetAccountProjectsByIdQueryParams): ReactQueryGetAccountProjectsByIdQueryResponse => ({
  queryKey: getAccountProjectsByIdQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<AccountProjectsByIdQuery>({
        query: AccountProjectsByIdDocument,
        variables: { ...params },
      });
      const englishProjectsMetadata: EnglishProjectsMetadata = {};
      await Promise.all(
        data?.accountById?.projectsByAdminAccountId?.nodes?.map(
          async project => {
            if (project?.metadata && project?.id) {
              englishProjectsMetadata[project?.id] = await jsonLdCompact(
                project.metadata,
              );
            }
            const localizedMetadata =
              project?.projectTranslationsById?.nodes.find(
                translation => translation?.languageCode === languageCode,
              )?.metadata;

            if (localizedMetadata || project?.metadata) {
              project.metadata = await jsonLdCompact(
                localizedMetadata ?? project?.metadata,
              );
            }
          },
        ) || [],
      );

      return { data, englishProjectsMetadata };
    } catch (e) {
      return null;
    }
  },
  ...params,
});
