import { AccountByIdDocument, AccountByIdQuery } from 'generated/graphql';

import { ACCOUNT_BY_ID_QUERY_KEY } from './getAccountByIdQuery.constants';
import {
  ReactQueryGetAccountByIdQueryParams,
  ReactQueryGetAccountByIdQueryResponse,
} from './getAccountByIdQuery.types';

export const getAccountByIdQuery = ({
  client,
  ...params
}: ReactQueryGetAccountByIdQueryParams): ReactQueryGetAccountByIdQueryResponse => ({
  queryKey: [ACCOUNT_BY_ID_QUERY_KEY, params.id],
  queryFn: async () => {
    const { data } = await client.query<AccountByIdQuery>({
      query: AccountByIdDocument,
      variables: { ...params },
    });

    return data;
  },
  ...params,
});
