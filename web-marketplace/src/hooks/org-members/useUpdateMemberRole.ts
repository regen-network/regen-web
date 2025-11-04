import { useCallback } from 'react';
import type { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import {
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} from 'generated/graphql';
import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { getAssignedQuery } from 'lib/queries/react-query/cosmwasm/dao-rbam/getAssignedQuery/getAssignedQuery';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { useWallet } from 'lib/wallet/wallet';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

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
  getNewRoleId,
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
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const updateRole = useCallback(
    async (id: string, roleNameNew: BaseMemberRole) => {
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
                  daoRbamAddress,
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
                  daoRbamAddress,
                  cw4GroupAddress,
                  roleId,
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
              roleId,
              memberAddress,
              newRoleId,
              oldRoleId,
            })
          : addMemberActions({
              daoRbamAddress,
              cw4GroupAddress,
              authorizationId,
              roleId,
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
              const projectDao =
                project?.projectByProjectId?.daoByAdminDaoAddress;
              if (!projectDao) return null;
              const oldAssignment =
                projectDao.assignmentsByDaoAddress.nodes.find(
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
                        roleId: projectRoleId,
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
                        roleId: projectRoleId,
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
                  roleId: oldRoleId,
                  daoRbamAddress,
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
                    roleId: projectRoleId,
                    memberAddress,
                    newRoleId: projectNewRoleId,
                    oldRoleId: parseInt(oldAssignment.onChainRoleId),
                  })
                : addMemberActions({
                    cw4GroupAddress: projectDao.cw4GroupAddress,
                    daoRbamAddress: projectDao.daoRbamAddress,
                    authorizationId: projectAuthorizationId,
                    roleId: projectRoleId,
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

        try {
          setProcessingModal(atom => void (atom.open = true));
          await signingCosmWasmClient.executeMultiple(
            wallet.address,
            [orgExecuteInstruction, ...projectExecuteInstructions],
            2,
          );
          // revoking the old role if it was only off chain
          if (!assigned) {
            await deleteAssignment({
              variables: {
                input: { daoAddress, roleName: oldRoleName, accountId: id },
              },
            });
          }
          for (const assignment of offchainProjectAssignmentsToDelete) {
            await deleteAssignment({
              variables: {
                input: {
                  daoAddress: assignment.daoAddress,
                  roleName: assignment.roleName,
                  accountId: id,
                },
              },
            });
          }
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
            queryKey: getAccountByIdQueryKey({
              id: activeAccountId,
              daoAccountsOrderBy: params.daoAccountsOrderBy,
            }),
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
                queryKey: getAccountByIdQueryKey({
                  id: activeAccountId,
                  daoAccountsOrderBy: params.daoAccountsOrderBy,
                }),
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
      params.daoAccountsOrderBy,
      deleteAssignment,
    ],
  );

  return updateRole;
}
