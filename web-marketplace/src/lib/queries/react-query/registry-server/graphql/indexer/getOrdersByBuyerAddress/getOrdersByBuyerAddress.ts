import {
  IndexerOrdersByBuyerAddressDocument,
  IndexerOrdersByBuyerAddressQuery,
  IndexerOrdersByBuyerAddressQueryVariables,
} from 'generated/indexer-graphql';

import { getOrdersByBuyerAddressKey } from './getOrdersByBuyerAddress.constants';
import {
  ReactQueryOrdersByBuyerAddressProps,
  ReactQueryOrdersByBuyerAddressResponse,
} from './getOrdersByBuyerAddress.types';

export const getOrdersByBuyerAddressQuery = ({
  client,
  buyerAddress,
  ...params
}: ReactQueryOrdersByBuyerAddressProps): ReactQueryOrdersByBuyerAddressResponse => ({
  queryKey: getOrdersByBuyerAddressKey(buyerAddress),
  queryFn: async () => {
    try {
      const data = await client.query<
        IndexerOrdersByBuyerAddressQuery,
        IndexerOrdersByBuyerAddressQueryVariables
      >({
        query: IndexerOrdersByBuyerAddressDocument,
        variables: { buyerAddress },
      });

      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return null;
    }
  },
  ...params,
});
