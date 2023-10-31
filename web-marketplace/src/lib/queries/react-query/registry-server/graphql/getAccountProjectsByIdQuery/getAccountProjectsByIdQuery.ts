import {
  AccountProjectsByIdDocument,
  AccountProjectsByIdQuery,
} from 'generated/graphql';

import {
  ReactQueryGetAccountProjectsByIdQueryParams,
  ReactQueryGetAccountProjectsByIdQueryResponse,
} from './getAccountProjectsByIdQuery.types';
import { getAccountProjectsByIdQueryKey } from './getAccountProjectsByIdQuery.utils';

export const getAccountProjectsByIdQuery = ({
  client,
  ...params
}: ReactQueryGetAccountProjectsByIdQueryParams): ReactQueryGetAccountProjectsByIdQueryResponse => ({
  queryKey: getAccountProjectsByIdQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<AccountProjectsByIdQuery>({
        query: AccountProjectsByIdDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
