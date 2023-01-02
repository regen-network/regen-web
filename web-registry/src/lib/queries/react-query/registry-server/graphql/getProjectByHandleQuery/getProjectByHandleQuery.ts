import {
  ProjectByHandleDocument,
  ProjectByHandleQuery,
  ProjectByHandleQueryVariables,
} from 'generated/graphql';

import { getProjectByHandleKey } from './getProjectByHandleQuery.constants';
import {
  ReactQueryProjectByHandleProps,
  ReactQueryProjectByHandleResponse,
} from './getProjectByHandleQuery.types';

export const getProjectByHandleQuery = ({
  handle,
  client,
  ...params
}: ReactQueryProjectByHandleProps): ReactQueryProjectByHandleResponse => ({
  queryKey: getProjectByHandleKey(handle),
  queryFn: async () => {
    try {
      const projectByHandle = await client.query<
        ProjectByHandleQuery,
        ProjectByHandleQueryVariables
      >({ query: ProjectByHandleDocument, variables: { handle } });

      return projectByHandle;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
