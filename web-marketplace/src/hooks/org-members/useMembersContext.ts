import { useCallback, useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { useAtom, useSetAtom } from 'jotai';
import { getRoleAuthorizationIds } from 'utils/rbam.utils';
import { timer } from 'utils/timer';

import { useUpdateAssignmentMutation } from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { getBalanceQueryKey } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery.utils';
import { GET_ASSIGNED_KEY } from 'lib/queries/react-query/cosmwasm/dao-rbam/getAssignedQuery/getAssignedQuery.constants';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';
import { getOrganizationProjectsByDaoAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery';
import { getOrganizationProjectsByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery.utils';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { useWallet } from 'lib/wallet/wallet';

import { MISSING_REQUIRED_PARAMS } from './constants';
import { MembersHookParams, RefetchMembersParams } from './types';
import {
  findAssignment,
  getAuthorizationName,
  getProjectsCurrentUserCanManageMembers,
} from './utils';

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
  const { wallet } = useWallet();

  // Data needed for computed values
  const { data: orgData } = useQuery(
    getOrganizationProjectsByDaoAddressQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoAddress,
      daoAddress: daoAddress as string,
    }),
  );

  const { refetch } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoAddress,
      address: daoAddress as string,
      daoAccountsOrderBy: params.daoAccountsOrderBy,
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
                queryKey: getDaoByAddressWithAssignmentsQueryKey({
                  address: daoAddress,
                }),
              });
            }
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
        await reactQueryClient.invalidateQueries({
          queryKey: getOrganizationProjectsByDaoAddressQueryKey({
            daoAddress,
          }),
        });
        await reactQueryClient.invalidateQueries({
          queryKey: [GET_ASSIGNED_KEY, address],
        });
        if (wallet?.address)
          // Invalidate balance query for SendRegenModal
          await reactQueryClient.invalidateQueries({
            queryKey: getBalanceQueryKey({
              address: wallet?.address,
              denom: REGEN_DENOM,
            }),
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
      updateAssignment,
      setErrorBannerText,
      wallet?.address,
    ],
  );

  const checkErrors = useCallback(
    (
      projectsRes: PromiseSettledResult<any>[],
      daos?: { daoAddress?: string | null }[],
    ) => {
      const errors: string[] = [];
      projectsRes.forEach((res, idx) => {
        if (res.status === 'rejected') {
          const daoAddr = daos?.[idx]?.daoAddress;
          const reason =
            res.reason instanceof Error
              ? res.reason.message
              : String(res.reason);
          errors.push(`• ${daoAddr}: ${reason}`);
        }
      });
      if (errors.length) {
        setErrorBannerText(_(msg`Failed for projects:\n${errors.join('\n')}`));
      }
    },
    [_, setErrorBannerText],
  );

  const checkProjectsErrors = useCallback(
    (
      projectsRes: PromiseSettledResult<any>[],
      projects: ReturnType<typeof getProjectsCurrentUserCanManageMembers>,
    ) => {
      checkErrors(
        projectsRes,
        projects?.map(project => ({
          daoAddress: project?.projectByProjectId?.adminDaoAddress,
        })),
      );
    },
    [checkErrors],
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
    checkProjectsErrors,
    checkErrors,
  };
}
