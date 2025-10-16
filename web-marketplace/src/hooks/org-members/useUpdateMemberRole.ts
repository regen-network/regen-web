import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import type { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { useLingui } from '@lingui/react';

import { useWallet } from 'lib/wallet/wallet';
import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useUpdateAssignmentMutation } from 'generated/graphql';

import {
  getNewRoleId,
  updateAuthorizationAction,
  updateMemberRoleActions,
} from './utils';
import {
  orgRoles,
  projectRoles,
  MEMBER_NOT_FOUND,
  MISSING_REQUIRED_PARAMS,
} from './constants';
import { useMembersContext } from './useMembersContext';
import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { MembersHookParams } from './types';

export function useUpdateMemberRole(params: MembersHookParams) {
  const {
    daoAddress,
    daoRbamAddress,
    cw4GroupAddress,
    members,
    currentUserRole,
  } = params;
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const { activeAccountId } = useAuth();
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const [updateAssignment] = useUpdateAssignmentMutation();

  const {
    projectAuthorizationId,
    projectRoleId,
    roleId,
    authorizationId,
    projectsCurrentUserCanManageMembers,
    refetchMembers,
  } = useMembersContext(params);

  const updateRole = useCallback(
    async (id: string, roleNameNew: any) => {
      const role = roleNameNew; // keep original type compatibility
      if (
        !wallet?.address ||
        !signingCosmWasmClient ||
        !daoAddress ||
        !daoRbamAddress ||
        !cw4GroupAddress ||
        !role ||
        !currentUserRole ||
        !authorizationId ||
        !roleId ||
        !projectAuthorizationId ||
        !projectRoleId
      ) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const member = members.find(m => m.id === id);
      if (!member) {
        setErrorBannerText(_(MEMBER_NOT_FOUND));
        return;
      }
      const {
        role: oldRoleName,
        onChainRoleId: oldRoleId,
        address: memberAddress,
        visible,
      } = member;

      if (memberAddress) {
        const newRoleId = getNewRoleId({ type: 'organization', role });
        const projectNewRoleId = getNewRoleId({ type: 'project', role });

        // If we assign member the owner role,
        // it means we need to downgrade current user to admin
        // and update the 'can_manage_members_except_owner' authorization to use the new owner address
        const orgOwnerActions =
          role === ROLE_OWNER
            ? [
                ...updateMemberRoleActions({
                  daoRbamAddress: daoRbamAddress!,
                  authorizationId,
                  roleId,
                  memberAddress: wallet.address,
                  newRoleId: getNewRoleId({
                    type: 'organization',
                    role: ROLE_ADMIN,
                  }),
                  oldRoleId: getNewRoleId({
                    type: 'organization',
                    role: ROLE_OWNER,
                  }),
                }),
                updateAuthorizationAction({
                  daoRbamAddress: daoRbamAddress!,
                  cw4GroupAddress: cw4GroupAddress!,
                  roleId,
                  authorizationId,
                  newOwnerAddress: memberAddress,
                  authorizationIdToUpdate: orgRoles['admin'].authorizations[
                    'can_manage_members_except_owner'
                  ] as number,
                }),
              ]
            : [];

        const orgExecuteInstruction = {
          contractAddress: daoRbamAddress!,
          msg: {
            execute_actions: {
              actions: [
                ...updateMemberRoleActions({
                  daoRbamAddress: daoRbamAddress!,
                  authorizationId,
                  roleId,
                  memberAddress,
                  newRoleId,
                  oldRoleId,
                }),
                ...orgOwnerActions,
              ],
            },
          },
        };

        const projectExecuteInstructions = (projectsCurrentUserCanManageMembers
          ?.map(project => {
            const projectDao =
              project?.projectByProjectId?.daoByAdminDaoAddress;
            if (!projectDao) return null;
            const oldAssignment = projectDao.assignmentsByDaoAddress.nodes.find(
              a => a?.accountId === id,
            );
            const currentUserOldAssignment =
              projectDao.assignmentsByDaoAddress.nodes.find(
                a => a?.accountId === activeAccountId,
              );

            // If current user is owner of the project,
            // we need to downgrade current user to admin
            // and update the 'can_manage_members_except_owner' authorization to use the new owner address
            const projectOwnerActions =
              currentUserOldAssignment?.roleName === ROLE_OWNER &&
              role === ROLE_OWNER
                ? [
                    ...updateMemberRoleActions({
                      daoRbamAddress: projectDao.daoRbamAddress,
                      authorizationId: projectAuthorizationId!,
                      roleId: projectRoleId!,
                      memberAddress: wallet.address,
                      newRoleId: getNewRoleId({
                        type: 'project',
                        role: ROLE_ADMIN,
                      }),
                      oldRoleId: getNewRoleId({
                        type: 'project',
                        role: ROLE_OWNER,
                      }),
                    }),
                    updateAuthorizationAction({
                      daoRbamAddress: projectDao.daoRbamAddress,
                      cw4GroupAddress: projectDao.cw4GroupAddress,
                      roleId: projectRoleId!,
                      authorizationId: projectAuthorizationId!,
                      newOwnerAddress: memberAddress,
                      authorizationIdToUpdate: projectRoles['admin']
                        .authorizations[
                        'can_manage_members_except_owner'
                      ] as number,
                    }),
                  ]
                : [];

            // if the user is in the org but not in this project anymore,
            // we do not add him back to the project
            if (!oldAssignment) return null;
            return {
              contractAddress: project?.projectByProjectId?.adminDaoAddress,
              msg: {
                execute_actions: {
                  actions: [
                    ...updateMemberRoleActions({
                      daoRbamAddress: projectDao.daoRbamAddress,
                      authorizationId: projectAuthorizationId!,
                      roleId: projectRoleId!,
                      memberAddress,
                      newRoleId: projectNewRoleId,
                      oldRoleId: parseInt(oldAssignment.onChainRoleId),
                    }),
                    ...projectOwnerActions,
                  ],
                },
              },
            };
          })
          .filter(Boolean) || []) as ExecuteInstruction[];

        try {
          setProcessingModal(atom => void (atom.open = true));
          await signingCosmWasmClient.executeMultiple(
            wallet.address,
            [orgExecuteInstruction, ...projectExecuteInstructions],
            2,
          );
          await refetchMembers({
            address: memberAddress,
            role,
            visible,
            accountId: id,
          });
        } catch (e) {
          setProcessingModal(atom => void (atom.open = false));
          setErrorBannerText(String(e));
        }
      } else {
        try {
          await updateAssignment({
            variables: {
              input: {
                daoAddress,
                roleName: oldRoleName,
                accountId: id,
                assignmentPatch: { roleName: role },
              },
            },
          });
          await reactQueryClient.invalidateQueries({
            queryKey: getAccountByIdQueryKey({ id: activeAccountId }),
          });
        } catch (e) {
          setErrorBannerText(String(e));
        }

        if (projectsCurrentUserCanManageMembers)
          for (const project of projectsCurrentUserCanManageMembers) {
            if (!project) continue;
            try {
              const projectDaoAddress =
                project?.projectByProjectId?.adminDaoAddress;
              const projectOldRoleName =
                project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress.nodes?.find(
                  a => a?.accountId === id,
                )?.roleName;
              if (!projectDaoAddress || !projectOldRoleName) return;
              await updateAssignment({
                variables: {
                  input: {
                    daoAddress: projectDaoAddress,
                    roleName: projectOldRoleName,
                    accountId: id,
                    assignmentPatch: { roleName: role },
                  },
                },
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByIdQueryKey({ id: activeAccountId }),
              });
            } catch (e) {
              setErrorBannerText(String(e));
            }
          }
      }
    },
    [
      wallet?.address,
      signingCosmWasmClient,
      daoAddress,
      daoRbamAddress,
      cw4GroupAddress,
      currentUserRole,
      authorizationId,
      roleId,
      projectAuthorizationId,
      projectRoleId,
      members,
      projectsCurrentUserCanManageMembers,
      setErrorBannerText,
      _,
      reactQueryClient,
      activeAccountId,
      setProcessingModal,
      updateAssignment,
      refetchMembers,
    ],
  );

  return updateRole;
}
