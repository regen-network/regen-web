import { useMemo, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';

import { useQuery } from '@tanstack/react-query';

import { getAccountsByNameOrAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountsByNameOrAddr/getAccountsByNameOrAddrQuery';
import { getDaoByAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressQuery/getDaoByAddressQuery';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAtom } from 'jotai';
import { useSaveProfile } from 'components/organisms/BaseMembersTable/modals/hooks/useSaveProfile';

export const useInviteMember = () => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [debouncedValue, setDebouncedValue] = useState('');
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { data: accounts } = useQuery(
    getAccountsByNameOrAddrQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!debouncedValue,
      input: debouncedValue,
      languageCode: selectedLanguage,
    }),
  );
  const { data: daoData } = useQuery(
    getDaoByAddressQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!debouncedValue,
      address: debouncedValue,
    }),
  );

  const { saveProfile, onUpload } = useSaveProfile();
  return {
    setDebouncedValue,
    accounts,
    daoData,
    saveProfile,
    onUpload,
  };
};
