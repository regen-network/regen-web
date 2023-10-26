import { AccountByIdDocument, AccountByIdQuery } from 'generated/graphql';

import {
  ReactQueryGetAccountByIdQueryParams,
  ReactQueryGetAccountByIdQueryResponse,
} from './getAccountByIdQuery.types';
import { getAccountByIdQueryKey } from './getAccountByIdQuery.utils';

export const getAccountByIdQuery = ({
  client,
  ...params
}: ReactQueryGetAccountByIdQueryParams): ReactQueryGetAccountByIdQueryResponse => ({
  queryKey: getAccountByIdQueryKey({ id: params.id }),
  queryFn: async () => {
    const { data } = await client.query<AccountByIdQuery>({
      query: AccountByIdDocument,
      variables: { ...params },
    });

    return data;
  },
  ...params,
});
