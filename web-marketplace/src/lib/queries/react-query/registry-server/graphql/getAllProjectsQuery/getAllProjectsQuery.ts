import { AllProjectsDocument, AllProjectsQuery } from 'generated/graphql';

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

    return data;
  },
  ...params,
});
