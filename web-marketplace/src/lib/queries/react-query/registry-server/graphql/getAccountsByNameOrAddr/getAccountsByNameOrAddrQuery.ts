import {
  GetAccountsByNameOrAddrDocument,
  GetAccountsByNameOrAddrQuery,
} from 'generated/graphql';

import {
  ReactQueryGetAccountsByNameOrAddrQueryParams,
  ReactQueryGetAccountsByNameOrAddrQueryResponse,
} from './getAccountsByNameOrAddrQuery.types';
import { getAccountsByNameOrAddrQueryKey } from './getAccountsByNameOrAddrQuery.utils';

export const getAccountsByNameOrAddrQuery = ({
  client,
  languageCode,
  ...params
}: ReactQueryGetAccountsByNameOrAddrQueryParams): ReactQueryGetAccountsByNameOrAddrQueryResponse => ({
  queryKey: getAccountsByNameOrAddrQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<GetAccountsByNameOrAddrQuery>({
        query: GetAccountsByNameOrAddrDocument,
        variables: { ...params },
      });

      const localizedData =
        data?.getAccountsByNameOrAddr?.nodes.map(node => {
          const localizedDescription =
            node?.accountTranslationsById?.nodes.find(
              translation => translation?.languageCode === languageCode,
            )?.description ?? node?.description;

          return Object.assign({}, node, {
            description: localizedDescription,
          });
        }) ?? [];

      return { getAccountsByNameOrAddr: { nodes: localizedData } };
    } catch (e) {
      return null;
    }
  },
  ...params,
});
