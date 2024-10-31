import { AccountByIdDocument, AccountByIdQuery } from 'generated/graphql';

import {
  ReactQueryGetAccountByIdQueryParams,
  ReactQueryGetAccountByIdQueryResponse,
} from './getAccountByIdQuery.types';
import { getAccountByIdQueryKey } from './getAccountByIdQuery.utils';

export const getAccountByIdQuery = ({
  client,
  languageCode,
  ...params
}: ReactQueryGetAccountByIdQueryParams): ReactQueryGetAccountByIdQueryResponse => ({
  queryKey: [...getAccountByIdQueryKey({ id: params.id }), languageCode],
  queryFn: async () => {
    const { data } = await client.query<AccountByIdQuery>({
      query: AccountByIdDocument,
      variables: { ...params },
    });

    const localizedDescription =
      data?.accountById?.accountTranslationsById.nodes.find(
        node => node?.languageCode === languageCode,
      )?.description ?? data?.accountById?.description;

    const localizedData = Object.assign({}, data, {
      accountById: {
        ...data.accountById,
        description: localizedDescription,
      },
    });

    return localizedData;
  },
  ...params,
});
