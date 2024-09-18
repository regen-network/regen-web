/* eslint-disable lingui/no-unlocalized-strings */
import { AllProjectsDocument, AllProjectsQuery } from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

import {
  ReactQueryGetAllProjectsParams,
  ReactQueryGetAllProjectsResponse,
} from './getAllProjectsQuery.types';

export const getAllProjectsQuery = ({
  client,
  ...params
}: ReactQueryGetAllProjectsParams): ReactQueryGetAllProjectsResponse => ({
  queryKey: ['AllProjectsQuery'],
  queryFn: async () => {
    const { data } = await client.query<AllProjectsQuery>({
      query: AllProjectsDocument,
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
