import { useCallback } from 'react';
import type { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getMsgExecuteContract } from 'utils/cosmwasm';
import { getAuthorizationId } from 'utils/rbam.utils';

import {
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} from 'generated/graphql';
import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { getAssignedQuery } from 'lib/queries/react-query/cosmwasm/dao-rbam/getAssignedQuery/getAssignedQuery';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';
import { getOrganizationProjectsByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery.utils';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { useWallet } from 'lib/wallet/wallet';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useMsgClient } from 'hooks';

import {
  MEMBER_NOT_FOUND,
  MISSING_REQUIRED_PARAMS,
  orgRoles,
  projectRoles,
} from './constants';
import { AssignmentToDelete, MembersHookParams } from './types';
import { useMembersContext } from './useMembersContext';
import {
  addMemberActions,
  getAuthorizationName,
  getNewOrgRoleId,
  getNewProjectRoleId,
  updateAuthorizationAction,
  updateMemberRoleActions,
} from './utils';

export function useUpdateMemberRole(params: MembersHookParams) {
  const {
    daoAddress,
    daoRbamAddress,
    cw4GroupAddress,
    members,
    currentUserRole,
    feeGranter,
  } = params;
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const { activeAccountId } = useAuth();
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const [updateAssignment] = useUpdateAssignmentMutation();
  const { signAndBroadcast } = useMsgClient();

  const {
    authorizationId,
    projectsCurrentUserCanManageMembers,
    refetchMembers,
    checkProjectsErrors,
    onTxErrorCallback,
    checkErrors,
  } = useMembersContext(params);
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const updateRoleWithWalletAddress = useCallback(
    async (
      id: string,
      role: BaseMemberRole,
      oldRoleId: number,
      oldRoleName: string,
      memberAddress: string,
      visible: boolean,
    ) => {
      if (
        !wallet?.address ||
        !signingCosmWasmClient ||
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

      const newRoleId = getNewOrgRoleId(role);
      const projectNewRoleId = getNewProjectRoleId(role);

      // If we assign member the owner role,
      // it means we need to downgrade current user to admin
      // and update the 'can_manage_members_except_owner' authorization to use the new owner address
      const orgOwnerActions =
        role === ROLE_OWNER
          ? [
              ...updateMemberRoleActions({
                daoRbamAddress,
                authorizationId,
                memberAddress: wallet.address,
                newRoleId: getNewOrgRoleId(ROLE_ADMIN),
                oldRoleId: getNewOrgRoleId(ROLE_OWNER),
              }),
              updateAuthorizationAction({
                daoRbamAddress,
                cw4GroupAddress,
                authorizationId,
                newOwnerAddress: memberAddress,
                authorizationIdToUpdate: orgRoles['admin'].authorizations[
                  'can_manage_members_except_owner'
                ] as number,
              }),
            ]
          : [];

      // Check if old role is assigned
      // If member was initially added with email address and added a wallet address later on,
      // then old role was not assigned on chain (only off chain)
      const assignedRes = await getFromCacheOrFetch({
        reactQueryClient,
        query: getAssignedQuery({
          client: signingCosmWasmClient,
          addr: memberAddress,
          roleId: oldRoleId,
          daoRbamAddress,
        }),
      });
      const assigned = assignedRes?.assigned;

      // If member was not assigned on chain, then we only add him
      // revoking the old role will be done off chain only
      const memberRoleActions = assigned
        ? updateMemberRoleActions({
            daoRbamAddress,
            authorizationId,
            memberAddress,
            newRoleId,
            oldRoleId,
          })
        : addMemberActions({
            daoRbamAddress,
            cw4GroupAddress,
            authorizationId,
            memberAddress,
            roleIdToAdd: newRoleId,
          });

      const orgExecuteInstruction = {
        contractAddress: daoRbamAddress,
        msg: {
          execute_actions: {
            actions: [...memberRoleActions, ...orgOwnerActions],
          },
        },
      };

      const offchainProjectAssignmentsToDelete: AssignmentToDelete[] = [];
      const projectExecuteInstructions = (await Promise.all(
        projectsCurrentUserCanManageMembers
          ?.map(async project => {
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

            const projectDao =
              project?.projectByProjectId?.daoByAdminDaoAddress;
            if (!projectDao) return null;
            const oldAssignment = projectDao.assignmentsByDaoAddress.nodes.find(
              a => a?.accountId === id,
            );

            // if the user is in the org but not in this project anymore,
            // we do not add him back to the project
            if (!oldAssignment) return null;

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
                      memberAddress: wallet.address,
                      newRoleId: getNewProjectRoleId(ROLE_ADMIN),
                      oldRoleId: getNewProjectRoleId(ROLE_OWNER),
                    }),
                    updateAuthorizationAction({
                      daoRbamAddress: projectDao.daoRbamAddress,
                      cw4GroupAddress: projectDao.cw4GroupAddress,
                      authorizationId: projectAuthorizationId!,
                      newOwnerAddress: memberAddress,
                      authorizationIdToUpdate: projectRoles['admin']
                        .authorizations[
                        'can_manage_members_except_owner'
                      ] as number,
                    }),
                  ]
                : [];

            const assignedRes = await getFromCacheOrFetch({
              reactQueryClient,
              query: getAssignedQuery({
                client: signingCosmWasmClient,
                addr: memberAddress,
                roleId: parseInt(oldAssignment.onChainRoleId),
                daoRbamAddress: projectDao.daoRbamAddress,
              }),
            });
            const assigned = assignedRes?.assigned;

            if (!assigned && project.projectByProjectId?.adminDaoAddress)
              offchainProjectAssignmentsToDelete.push({
                daoAddress: project.projectByProjectId?.adminDaoAddress,
                roleName: oldAssignment.roleName,
              });

            // If member was not assigned on chain, then we only add him
            // revoking the old role will be done off chain only
            const memberRoleActions = assigned
              ? updateMemberRoleActions({
                  daoRbamAddress: projectDao.daoRbamAddress,
                  authorizationId: projectAuthorizationId,
                  memberAddress,
                  newRoleId: projectNewRoleId,
                  oldRoleId: parseInt(oldAssignment.onChainRoleId),
                })
              : addMemberActions({
                  cw4GroupAddress: projectDao.cw4GroupAddress,
                  daoRbamAddress: projectDao.daoRbamAddress,
                  authorizationId: projectAuthorizationId,
                  memberAddress,
                  roleIdToAdd: projectNewRoleId,
                });

            return {
              contractAddress: projectDao.daoRbamAddress,
              msg: {
                execute_actions: {
                  actions: [...memberRoleActions, ...projectOwnerActions],
                },
              },
            };
          })
          .filter(Boolean) || [],
      )) as ExecuteInstruction[];

      const msgs = [orgExecuteInstruction, ...projectExecuteInstructions].map(
        instruction =>
          getMsgExecuteContract({
            walletAddress: wallet?.address,
            contract: instruction.contractAddress,
            executeActionsMsg: instruction.msg,
          }),
      );

      try {
        const txResult = await signAndBroadcast(
          {
            msgs: msgs,
            fee: 'auto',
            feeGranter,
          },
          () => setProcessingModal(atom => void (atom.open = true)),
          {
            onError: onTxErrorCallback,
          },
        );
        if (!txResult || typeof txResult === 'string') {
          return;
        }

        // revoking the old role if it was only off chain
        if (!assigned) {
          await deleteAssignment({
            variables: {
              input: { daoAddress, roleName: oldRoleName, accountId: id },
            },
          });
        }
        const delAssignmentsRes = await Promise.allSettled(
          offchainProjectAssignmentsToDelete.map(async assignment => {
            await deleteAssignment({
              variables: {
                input: {
                  daoAddress: assignment.daoAddress,
                  roleName: assignment.roleName,
                  accountId: id,
                },
              },
            });
          }),
        );
        checkErrors(delAssignmentsRes, offchainProjectAssignmentsToDelete);

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
    },
    [
      wallet,
      signingCosmWasmClient,
      daoAddress,
      daoRbamAddress,
      cw4GroupAddress,
      currentUserRole,
      authorizationId,
      projectsCurrentUserCanManageMembers,
      reactQueryClient,
      deleteAssignment,
      refetchMembers,
      setProcessingModal,
      setErrorBannerText,
      activeAccountId,
      checkErrors,
      signAndBroadcast,
      feeGranter,
      onTxErrorCallback,
      _,
    ],
  );

  const updateRoleOffChain = useCallback(
    async (id: string, role: BaseMemberRole, oldRoleName: string) => {
      if (!daoAddress) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }
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
          queryKey: getDaoByAddressWithAssignmentsQueryKey({
            address: daoAddress,
          }),
        });
      } catch (e) {
        setErrorBannerText(String(e));
      }

      if (projectsCurrentUserCanManageMembers) {
        const projectsRes = await Promise.allSettled(
          projectsCurrentUserCanManageMembers.map(async project => {
            if (!project) return;
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
              queryKey: getDaoByAddressWithAssignmentsQueryKey({
                address: projectDaoAddress,
              }),
            });
          }),
        );
        await reactQueryClient.invalidateQueries({
          queryKey: getOrganizationProjectsByDaoAddressQueryKey({
            daoAddress,
          }),
        });
        checkProjectsErrors(projectsRes, projectsCurrentUserCanManageMembers);
      }
    },
    [
      daoAddress,
      reactQueryClient,
      projectsCurrentUserCanManageMembers,
      updateAssignment,
      setErrorBannerText,
      checkProjectsErrors,
      _,
    ],
  );

  const updateRole = useCallback(
    async (id: string, role: BaseMemberRole) => {
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
        await updateRoleWithWalletAddress(
          id,
          role,
          oldRoleId,
          oldRoleName,
          memberAddress,
          visible,
        );
      } else {
        await updateRoleOffChain(id, role, oldRoleName);
      }
    },
    [
      members,
      updateRoleWithWalletAddress,
      updateRoleOffChain,
      setErrorBannerText,
      _,
    ],
  );

  return updateRole;
}
