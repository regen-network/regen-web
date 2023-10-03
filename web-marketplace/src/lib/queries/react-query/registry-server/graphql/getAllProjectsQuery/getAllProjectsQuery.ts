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
          try {
            project.metadata = await jsonLdCompact(project.metadata);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
          }
        }
        return project;
      }) || [],
    );

    return data;
  },
  ...params,
});
