import { useApolloClient } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { getAllRetirementsByOwnerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getAllRetirementsByOwner/getAllRetirementsByOwner';
import { useWallet } from 'lib/wallet/wallet';

export const useFetchRetirements = () => {
  const apolloClient = useApolloClient();
  const { wallet } = useWallet();
  const { data } = useQuery(
    getAllRetirementsByOwnerQuery({
      client: apolloClient,
      owner: wallet?.address ?? '',
      enabled: !!apolloClient && !!wallet?.address,
    }),
  );
};
