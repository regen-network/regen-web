import {
  ProjectByIdDocument,
  ProjectByIdQuery,
} from 'generated/sanity-graphql';

import { getProjectByIdKey } from './getProjectByIdQuery.constants';
import {
  ReactQueryGetProjectByIdQueryParams,
  ReactQueryGetProjectByIdResponse,
} from './getProjectByIdQuery.types';

export const getProjectByIdQuery = ({
  sanityClient,
  id,
  ...params
}: ReactQueryGetProjectByIdQueryParams): ReactQueryGetProjectByIdResponse => ({
  queryKey: getProjectByIdKey(id),
  queryFn: async () => {
    const { data: projectById } = await sanityClient.query<ProjectByIdQuery>({
      query: ProjectByIdDocument,
      variables: { id },
    });

    return projectById;
  },
  ...params,
});
