import {
  ShaclGraphByUriDocument,
  ShaclGraphByUriQuery,
  ShaclGraphByUriQueryVariables,
} from 'generated/graphql';

import { getShaclGraphByUriKey } from './getShaclGraphByUriQuery.constants';
import {
  ReactQueryShaclGraphByUriProps,
  ReactQueryShaclGraphByUriResponse,
} from './getShaclGraphByUriQuery.types';

export const getShaclGraphByUriQuery = ({
  uri,
  client,
  ...params
}: ReactQueryShaclGraphByUriProps): ReactQueryShaclGraphByUriResponse => ({
  queryKey: getShaclGraphByUriKey(uri),
  queryFn: async () => {
    try {
      return await client.query<
        ShaclGraphByUriQuery,
        ShaclGraphByUriQueryVariables
      >({
        query: ShaclGraphByUriDocument,
        variables: { uri },
      });
    } catch (e) {
      return null;
    }
  },
  ...params,
});
