/* eslint-disable lingui/no-unlocalized-strings */
import { MoreProjectsDocument, MoreProjectsQuery } from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

import {
  ReactQueryGetMoreProjectsParams,
  ReactQueryGetMoreProjectsResponse,
} from './getMoreProjectsQuery.types';

export const getMoreProjectsQuery = ({
  client,
  ...params
}: ReactQueryGetMoreProjectsParams): ReactQueryGetMoreProjectsResponse => ({
  queryKey: ['MoreProjectsQuery'],
  queryFn: async () => {
    const { data } = await client.query<MoreProjectsQuery>({
      query: MoreProjectsDocument,
    });

    await Promise.all(
      data?.allProjects?.nodes?.map(async project => {
        if (project?.metadata) {
          project.metadata = await jsonLdCompact(project.metadata);
        }
        return project;
      }) || [],
    );
    return data;
  },
  ...params,
});
