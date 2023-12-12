import { useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

export const useProfileData = () => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const isValidRegenAddress = isValidAddress(accountAddressOrId ?? '', 'regen');

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: csrfData, isFetching: isLoadingCsrfToken } = useQuery(
    getCsrfTokenQuery({}),
  );
  const { data: accountByAddr, isFetching: isLoadingAccountByAddr } = useQuery(
    getAccountByAddrQuery({
      client: graphqlClient,
      addr: accountAddressOrId ?? '',
      enabled: isValidRegenAddress && !!graphqlClient && !!csrfData,
    }),
  );
  const { data: accountById, isFetching: isLoadingAccountById } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      id: accountAddressOrId ?? '',
      enabled: !isValidRegenAddress && !!graphqlClient && !!csrfData,
    }),
  );

  const account = accountByAddr?.accountByAddr ?? accountById?.accountById;

  const address = isValidRegenAddress
    ? accountAddressOrId
    : accountById?.accountById?.addr;

  return {
    address,
    account,
    isLoading:
      isLoadingCsrfToken || isLoadingAccountByAddr || isLoadingAccountById,
  };
};
