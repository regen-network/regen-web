import { CLASSES_KEY } from './getClassesQuery.constants';
import {
  ReactQueryClassesProps,
  ReactQueryClassesResponse,
} from './getClassesQuery.types';

export const getClassesQuery = ({
  client,
  request = {},
  ...params
}: ReactQueryClassesProps): ReactQueryClassesResponse => ({
  queryKey: [CLASSES_KEY],
  queryFn: async () => {
    if (!client) return null;
    return await client.Classes(request);
  },
  ...params,
});
