import { queryClasses } from 'lib/ecocredit/api';

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
    return await queryClasses({ client, request });
  },
  ...params,
});
