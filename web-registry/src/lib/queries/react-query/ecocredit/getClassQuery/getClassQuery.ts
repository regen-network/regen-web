import {
  ReactQueryClassProps,
  ReactQueryClassResponse,
} from './getClassQuery.types';
import { getClassQueryKey } from './getClassQuery.utils';

export const getClassQuery = ({
  client,
  request,
  ...params
}: ReactQueryClassProps): ReactQueryClassResponse => ({
  queryKey: getClassQueryKey({
    classId: request.classId,
  }),
  queryFn: async () => {
    if (!client) return null;
    return await client.Class(request);
  },
  ...params,
});
