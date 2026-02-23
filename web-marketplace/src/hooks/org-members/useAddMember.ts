import { useCallback } from 'react';
import type { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { MEMBER_ADDED } from 'legacy-pages/Dashboard/MyProjects/hooks/collaborators/constants';
import { getMsgExecuteContract } from 'utils/cosmwasm';
import { postData } from 'utils/fetch/postData';
import { getAuthorizationId } from 'utils/rbam.utils';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';
import { getOrganizationProjectsByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import {
  BaseMemberRole,
  MemberData,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useMsgClient } from 'hooks';

import { MISSING_REQUIRED_PARAMS } from './constants';
import { MembersHookParams } from './types';
import { useMembersContext } from './useMembersContext';
import {
  addMemberActions,
  getAuthorizationName,
  getNewOrgRoleId,
  getNewProjectRoleId,
} from './utils';

export function useAddMember(params: MembersHookParams) {
  const {
    daoAddress,
    daoRbamAddress,
    cw4GroupAddress,
    currentUserRole,
    feeGranter,
  } = params;
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const setBannerText = useSetAtom(bannerTextAtom);
  const { signAndBroadcast } = useMsgClient();

  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const {
    projectsCurrentUserCanManageMembers,
    authorizationId,
    refetchMembers,
    checkProjectsErrors,
    onTxErrorCallback,
  } = useMembersContext(params);

  const addMemberWithWalletAddress = useCallback(
    async (
      data: MemberData<BaseMemberRole>,
      roleIdToAdd: number,
      projectRoleIdToAdd: number,
    ) => {
      const { role, addressOrEmail, visible } = data;

      if (
        !wallet?.address ||
        !daoAddress ||
        !daoRbamAddress ||
        !cw4GroupAddress ||
        !role ||
        !currentUserRole ||
        !authorizationId
      ) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const orgExecuteInstruction = {
        contractAddress: daoRbamAddress,
        msg: {
          execute_actions: {
            actions: addMemberActions({
              daoRbamAddress,
              cw4GroupAddress,
              authorizationId,
              memberAddress: addressOrEmail,
              roleIdToAdd,
              withFeegrant: true,
              daoAddress,
            }),
          },
        },
      };

      const projectExecuteInstructions = (projectsCurrentUserCanManageMembers
        ?.map(project => {
          const projectCurrentUserRole = project?.currentUserRole;
          const authorizationName = getAuthorizationName(
            projectCurrentUserRole,
          );
          const { authorizationId: projectAuthorizationId } =
            getAuthorizationId({
              type: 'project',
              currentUserRole: projectCurrentUserRole,
              authorizationName,
            });
          if (!projectAuthorizationId) return null;

          const projectDao = project?.projectByProjectId?.daoByAdminDaoAddress;
          if (!projectDao) return null;

          // If user is already member of the project,
          const isMemberOfProject =
            projectDao?.assignmentsByDaoAddress?.nodes.some(
              assignment =>
                assignment?.accountByAccountId?.addr === addressOrEmail,
            );
          // then we keep his/her role there unchanged
          if (isMemberOfProject) return null;

          return {
            contractAddress: projectDao.daoRbamAddress,
            msg: {
              execute_actions: {
                actions: addMemberActions({
                  daoRbamAddress: projectDao.daoRbamAddress,
                  cw4GroupAddress: projectDao.cw4GroupAddress,
                  authorizationId: projectAuthorizationId,
                  memberAddress: addressOrEmail,
                  roleIdToAdd: projectRoleIdToAdd,
                }),
              },
            },
          };
        })
        .filter(Boolean) || []) as ExecuteInstruction[];

      const msgs = [orgExecuteInstruction, ...projectExecuteInstructions].map(
        instruction =>
          getMsgExecuteContract({
            walletAddress: wallet?.address,
            contract: instruction.contractAddress,
            executeActionsMsg: instruction.msg,
          }),
      );

      try {
        await signAndBroadcast(
          {
            msgs: msgs,
            fee: 'auto',
            feeGranter,
          },
          () => setProcessingModal(atom => void (atom.open = true)),
          {
            onError: onTxErrorCallback,
            onSuccess: async () => {
              await refetchMembers({ address: addressOrEmail, role, visible });
              setBannerText(_(MEMBER_ADDED));
            },
          },
        );
      } catch (e) {
        setProcessingModal(atom => void (atom.open = false));
        setErrorBannerText(String(e));
      }
    },
    [
      wallet?.address,
      daoAddress,
      daoRbamAddress,
      cw4GroupAddress,
      currentUserRole,
      authorizationId,
      projectsCurrentUserCanManageMembers,
      setErrorBannerText,
      _,
      refetchMembers,
      setProcessingModal,
      setBannerText,
      onTxErrorCallback,
      feeGranter,
      signAndBroadcast,
    ],
  );

  const addMemberOffChain = useCallback(
    async (
      data: MemberData<BaseMemberRole>,
      roleIdToAdd: number,
      projectRoleIdToAdd: number,
    ) => {
      if (!daoAddress || !token) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const { role, addressOrEmail, visible } = data;
      try {
        await postData({
          url: `${apiServerUrl}/marketplace/v1/assignments/add-by-email`,
          data: {
            email: addressOrEmail,
            roleName: role,
            daoAddress,
            visible,
            onChainRoleId: roleIdToAdd,
          },
          token,
          retryCsrfRequest,
          onSuccess: async () => {
            await reactQueryClient.invalidateQueries({
              queryKey: getDaoByAddressWithAssignmentsQueryKey({
                address: daoAddress,
                daoAccountsOrderBy: params.daoAccountsOrderBy,
              }),
            });
          },
        });
      } catch (e) {
        setErrorBannerText(String(e));
      }

      if (projectsCurrentUserCanManageMembers) {
        const projectsFiltered = projectsCurrentUserCanManageMembers.filter(
          project => {
            if (!project) return false;
            // If user is already member of the project,
            const isMemberOfProject =
              project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress?.nodes.some(
                assignment =>
                  assignment?.accountByAccountId?.privateAccountById?.email ===
                  addressOrEmail,
              );
            // then we keep his/her role there unchanged
            return !isMemberOfProject;
          },
        );
        const projectsRes = await Promise.allSettled(
          projectsFiltered.map(
            async project =>
              await postData({
                url: `${apiServerUrl}/marketplace/v1/assignments/add-by-email`,
                data: {
                  email: addressOrEmail,
                  roleName: role,
                  daoAddress: project?.projectByProjectId?.adminDaoAddress,
                  visible,
                  onChainRoleId: projectRoleIdToAdd,
                },
                token,
                retryCsrfRequest,
                onSuccess: async () => {
                  await reactQueryClient.invalidateQueries({
                    queryKey: getOrganizationProjectsByDaoAddressQueryKey({
                      daoAddress,
                    }),
                  });
                  if (project?.projectByProjectId?.adminDaoAddress)
                    await reactQueryClient.invalidateQueries({
                      queryKey: getDaoByAddressWithAssignmentsQueryKey({
                        address: project?.projectByProjectId?.adminDaoAddress,
                      }),
                    });
                },
              }),
          ),
        );
        checkProjectsErrors(projectsRes, projectsFiltered);
        if (projectsRes.every(res => res.status === 'fulfilled')) {
          setBannerText(_(MEMBER_ADDED));
        }
      }
    },
    [
      daoAddress,
      token,
      setErrorBannerText,
      _,
      reactQueryClient,
      params.daoAccountsOrderBy,
      projectsCurrentUserCanManageMembers,
      retryCsrfRequest,
      checkProjectsErrors,
      setBannerText,
    ],
  );

  const addMember = useCallback(
    async (data: MemberData<BaseMemberRole>) => {
      const { role, addressOrEmail } = data;
      const isWalletAddr = isValidAddress(addressOrEmail);

      if (!role) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const roleIdToAdd = getNewOrgRoleId(role);
      const projectRoleIdToAdd = getNewProjectRoleId(role);

      if (isWalletAddr) {
        await addMemberWithWalletAddress(data, roleIdToAdd, projectRoleIdToAdd);
      } else if (token) {
        await addMemberOffChain(data, roleIdToAdd, projectRoleIdToAdd);
      }
    },
    [
      addMemberWithWalletAddress,
      addMemberOffChain,
      setErrorBannerText,
      _,
      token,
    ],
  );

  return addMember;
}
