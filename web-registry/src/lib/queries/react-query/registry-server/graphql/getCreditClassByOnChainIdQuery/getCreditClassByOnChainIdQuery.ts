import {
  CreditClassByOnChainIdDocument,
  CreditClassByOnChainIdQuery,
  CreditClassByOnChainIdQueryVariables,
} from 'generated/graphql';
import { jsonLdCompactCreditClassMetadata } from 'lib/queries/react-query/utils/jsonLdCompactCreditClassMetadata';

import { getCreditClassByOnChainIdKey } from './getCreditClassByOnChainIdQuery.constants';
import {
  ReactQueryCreditClassByOnChainIdProps,
  ReactQueryCreditClassByOnChainIdResponse,
} from './getCreditClassByOnChainIdQuery.types';

export const getCreditClassByOnChainIdQuery = ({
  onChainId,
  client,
  ...params
}: ReactQueryCreditClassByOnChainIdProps): ReactQueryCreditClassByOnChainIdResponse => ({
  queryKey: getCreditClassByOnChainIdKey(onChainId),
  queryFn: async () => {
    try {
      const creditClassByOnChainId = await client.query<
        CreditClassByOnChainIdQuery,
        CreditClassByOnChainIdQueryVariables
      >({
        query: CreditClassByOnChainIdDocument,
        variables: { onChainId },
        fetchPolicy: 'no-cache',
      });

      await jsonLdCompactCreditClassMetadata(creditClassByOnChainId.data);

      return creditClassByOnChainId;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
