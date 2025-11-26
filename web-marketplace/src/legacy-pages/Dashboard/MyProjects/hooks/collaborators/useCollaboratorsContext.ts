import { useCallback, useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { timer } from 'utils/timer';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { GET_ASSIGNED_KEY } from 'lib/queries/react-query/cosmwasm/dao-rbam/getAssignedQuery/getAssignedQuery.constants';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';
import { getOrganizationProjectsByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery.utils';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { useWallet } from 'lib/wallet/wallet';

import { MISSING_REQUIRED_PARAMS } from 'hooks/org-members/constants';
import {
  findAssignment,
  getAuthorizationName,
  getRoleAuthorizationIds,
} from 'hooks/org-members/utils';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import { CollaboratorsHookParams, RefetchCollaboratorsParams } from './types';

export function useCollaboratorsContext(params: CollaboratorsHookParams) {
  const { currentUserRole, daoAddress } = params;
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const reactQueryClient = useQueryClient();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const { wallet } = useWallet();
  const daoOrganization = useDaoOrganization();
  const orgDaoAddress = daoOrganization?.address;

  const { refetch } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoAddress,
      address: daoAddress as string,
      daoAccountsOrderBy: params.daoAccountsOrderBy,
    }),
  );

  const authorizationName = getAuthorizationName(currentUserRole);

  const { roleId: projectRoleId, authorizationId: projectAuthorizationId } =
    useMemo(
      () =>
        getRoleAuthorizationIds({
          type: 'project',
          currentUserRole,
          authorizationName,
        }),
      [currentUserRole, authorizationName],
    );

  const refetchMembers = useCallback(
    async ({
      address,
      role,
      accountId,
      shouldFindAssignment = true,
    }: RefetchCollaboratorsParams) => {
      if (!daoAddress) throw new Error(_(MISSING_REQUIRED_PARAMS));
      let stop = false;
      let i = 0;
      // wait for the assignment change(s) to be indexed in the db
      while (!stop && i < 15) {
        if (!accountId) {
          // fetch new member account
          const accRes = await getFromCacheOrFetch({
            query: getAccountByAddrQuery({
              addr: address,
              client: graphqlClient,
              enabled: !!address && !!graphqlClient,
              languageCode: selectedLanguage,
            }),
            reactQueryClient,
          });
          accountId = accRes?.accountByAddr?.id;
        }
        if (accountId) {
          // refetch assignments
          const res = await refetch();
          console.log('refetch members', res);
          const assignment = findAssignment({
            data: res.data,
            daoAddress,
            accountId,
            roleName: role,
          });
          stop = shouldFindAssignment ? !!assignment : !assignment;
          if (stop) {
            setProcessingModal(atom => void (atom.open = false));
          }
        }
        i++;
        await timer(500);
      }
      if (!stop) {
        setProcessingModal(atom => void (atom.open = false));
        setErrorBannerText(
          _(
            msg`Could not refetch assignments, you might need to reload the page later`,
          ),
        );
      } else {
        if (orgDaoAddress)
          await reactQueryClient.invalidateQueries({
            queryKey: getOrganizationProjectsByDaoAddressQueryKey({
              daoAddress: orgDaoAddress,
            }),
          });
        await reactQueryClient.invalidateQueries({
          queryKey: [GET_ASSIGNED_KEY, address],
        });
      }
    },
    [
      daoAddress,
      _,
      graphqlClient,
      selectedLanguage,
      reactQueryClient,
      refetch,
      setProcessingModal,
      setErrorBannerText,
      wallet?.address,
      orgDaoAddress,
    ],
  );

  return {
    // computed
    projectRoleId,
    projectAuthorizationId,
    // helpers
    refetchMembers,
  };
}
