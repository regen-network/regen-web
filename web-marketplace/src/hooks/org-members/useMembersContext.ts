import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { useSetAtom } from 'jotai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { useAuth } from 'lib/auth/auth';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';

import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getOrganizationByDaoAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getOrganizationByDaoAddressQuery/getOrganizationByDaoAddressQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import {
  getAuthorizationName,
  getProjectsCurrentUserCanManageMembers,
  getRoleAuthorizationIds,
  findAssignment,
} from './utils';
import { MISSING_REQUIRED_PARAMS } from './constants';
import { timer } from 'utils/timer';
import { MembersHookParams, RefetchMembersParams } from './types';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useUpdateAssignmentMutation } from 'generated/graphql';

export function useMembersContext(params: MembersHookParams) {
  const { currentUserRole, daoAddress } = params;
  const { _ } = useLingui();
  const { activeAccountId } = useAuth();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const reactQueryClient = useQueryClient();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);

  // Data needed for computed values
  const { data: orgData } = useQuery(
    getOrganizationByDaoAddressQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoAddress,
      daoAddress: daoAddress as string,
    }),
  );

  const { refetch } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!activeAccountId,
      id: activeAccountId,
      daoAccountsOrderBy: params.daoAccountsOrderBy,
      languageCode: selectedLanguage,
    }),
  );

  const [updateAssignment] = useUpdateAssignmentMutation();

  // We also need to update members for the org projects where current user can manage members,
  // ie has owner or admin role
  const projectsCurrentUserCanManageMembers = useMemo(
    () => getProjectsCurrentUserCanManageMembers({ orgData, activeAccountId }),
    [orgData, activeAccountId],
  );

  const authorizationName = getAuthorizationName(currentUserRole);
  const { roleId, authorizationId } = useMemo(
    () =>
      getRoleAuthorizationIds({
        type: 'organization',
        currentUserRole,
        authorizationName,
      }),
    [currentUserRole, authorizationName],
  );
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
      visible,
      accountId,
      shouldFindAssignment = true,
    }: RefetchMembersParams) => {
      if (!daoAddress) throw new Error(_(MISSING_REQUIRED_PARAMS));
      let stop = false;
      let i = 0;
      // wait for the assignment change(s) to be indexed in the db
      while (!stop && i < 10) {
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
          const assignment = findAssignment({
            data: res.data,
            daoAddress,
            accountId,
            roleName: role,
          });
          stop = shouldFindAssignment ? !!assignment : !assignment;
          if (stop) {
            setProcessingModal(atom => void (atom.open = false));
            // assignment.visible is true by default in our db,
            // but if the member shouldn't be visible,
            // then we need to update it manually
            if (shouldFindAssignment && !visible) {
              await updateAssignment({
                variables: {
                  input: {
                    daoAddress,
                    roleName: role,
                    accountId,
                    assignmentPatch: { visible },
                  },
                },
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByIdQueryKey({
                  id: activeAccountId,
                  daoAccountsOrderBy: params.daoAccountsOrderBy,
                }),
              });
            }
          }
        }
        i++;
        await timer(1000);
      }
      if (!stop) {
        setProcessingModal(atom => void (atom.open = false));
        setErrorBannerText(
          _(
            msg`Could not refetch assignments, you might need to reload the page later`,
          ),
        );
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
      updateAssignment,
      setErrorBannerText,
      activeAccountId,
      params.daoAccountsOrderBy,
    ],
  );

  return {
    // computed
    projectsCurrentUserCanManageMembers,
    roleId,
    authorizationId,
    projectRoleId,
    projectAuthorizationId,
    // helpers
    refetchMembers,
  };
}
