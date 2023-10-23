import { useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { isValidAddress } from 'web-components/lib/components/inputs/validation';

import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getPartyByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

export const useProfileData = () => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const isValidRegenAddress = isValidAddress(accountAddressOrId ?? '', 'regen');

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: csrfData, isFetching: isLoadingCsrfToken } = useQuery(
    getCsrfTokenQuery({}),
  );
  const { data: partyByAddr, isFetching: isLoadingPartyByAddr } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: accountAddressOrId ?? '',
      enabled: isValidRegenAddress && !!graphqlClient && !!csrfData,
    }),
  );
  const { data: partyById, isFetching: isLoadingPartyById } = useQuery(
    getPartyByIdQuery({
      client: graphqlClient,
      id: accountAddressOrId ?? '',
      enabled: !isValidRegenAddress && !!graphqlClient && !!csrfData,
    }),
  );

  const party =
    partyByAddr?.walletByAddr?.partyByWalletId ?? partyById?.partyById;

  const address = isValidRegenAddress
    ? accountAddressOrId
    : partyById?.partyById?.walletByWalletId?.addr;

  return {
    address,
    party,
    isLoading: isLoadingCsrfToken || isLoadingPartyByAddr || isLoadingPartyById,
  };
};
