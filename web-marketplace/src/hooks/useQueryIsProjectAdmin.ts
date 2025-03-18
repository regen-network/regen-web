import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { getAccountProjectsByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery';
import { useWallet } from 'lib/wallet/wallet';

type Props = {
  address?: string | null;
  accountId?: string;
};

export function useQueryIsProjectAdmin({ address, accountId }: Props) {
  const { queryClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const { activeAccountId: authAccountId } = useAuth();
  const walletAddress = wallet?.address;
  const activeAddress = address ?? walletAddress;
  const activeAccountId = accountId ?? authAccountId;

  // Admin of on chain projects
  const { data: projectsByAdmin, isFetching } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!activeAddress && !!queryClient,
      client: queryClient,
      request: { admin: activeAddress as string },
    }),
  );

  // Admin of off chain projects
  const { data: accountData, isFetching: isAccountLoading } = useQuery(
    getAccountProjectsByIdQuery({
      id: activeAccountId,
      client: graphqlClient,
      enabled: activeAccountId !== undefined,
      languageCode: selectedLanguage,
    }),
  );

  const isProjectAdmin =
    (projectsByAdmin?.projects?.length ?? 0) > 0 ||
    (accountData?.data?.accountById?.projectsByAdminAccountId?.nodes?.length ??
      0) > 0;

  return {
    isProjectAdmin,
    isLoadingIsProjectAdmin: isFetching || isAccountLoading,
  };
}
