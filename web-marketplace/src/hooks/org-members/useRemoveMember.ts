import { useCallback } from 'react';
import type { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getMsgExecuteContract } from 'utils/cosmwasm';
import { getRoleAuthorizationIds } from 'utils/rbam.utils';

import { useDeleteAssignmentMutation } from 'generated/graphql';
import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { getAssignedQuery } from 'lib/queries/react-query/cosmwasm/dao-rbam/getAssignedQuery/getAssignedQuery';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';
import { getOrganizationProjectsByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery.utils';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { useWallet } from 'lib/wallet/wallet';

import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useMsgClient } from 'hooks';

import {
  MEMBER_NOT_FOUND,
  MEMBER_REMOVED,
  MISSING_REQUIRED_PARAMS,
} from './constants';
import { AssignmentToDelete, MembersHookParams } from './types';
import { useMembersContext } from './useMembersContext';
import { getAuthorizationName, removeMemberActions } from './utils';

export function useRemoveMember(params: MembersHookParams) {
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
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const [deleteAssignment] = useDeleteAssignmentMutation();
  const { signAndBroadcast } = useMsgClient();

  const {
    roleId,
    authorizationId,
    projectsCurrentUserCanManageMembers,
    refetchMembers,
    checkProjectsErrors,
    checkErrors,
    onTxErrorCallback,
  } = useMembersContext(params);

  const removeMemberWithWalletAddress = useCallback(
    async (
      id: string,
      role: BaseMemberRole,
      memberRoleId: number,
      memberAddress: string,
    ) => {
      if (
        !wallet?.address ||
        !signingCosmWasmClient ||
        !daoAddress ||
        !daoRbamAddress ||
        !cw4GroupAddress ||
        !currentUserRole ||
        !authorizationId ||
        !roleId
      ) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }
      // Check if role is assigned
      // If member was initially added with email address and added a wallet address later on,
      // then role was not assigned on chain (only off chain)
      const assignedRes = await getFromCacheOrFetch({
        reactQueryClient,
        query: getAssignedQuery({
          client: signingCosmWasmClient,
          addr: memberAddress as string,
          roleId: memberRoleId,
          daoRbamAddress,
          enabled: !!memberAddress,
        }),
      });
      const assigned = assignedRes?.assigned;

      const orgExecuteInstruction = assigned
        ? {
            contractAddress: daoRbamAddress,
            msg: {
              execute_actions: {
                actions: removeMemberActions({
                  daoRbamAddress,
                  cw4GroupAddress,
                  authorizationId,
                  roleId,
                  memberAddress,
                  memberRoleId,
                  withFeegrant: true,
                  daoAddress,
                }),
              },
            },
          }
        : undefined;

      const offchainProjectAssignmentsToDelete: AssignmentToDelete[] = [];
      const projectExecuteInstructions = (await Promise.all(
        projectsCurrentUserCanManageMembers
          ?.map(async project => {
            const projectCurrentUserRole = project?.currentUserRole;
            const authorizationName = getAuthorizationName(
              projectCurrentUserRole,
            );
            const {
              roleId: projectRoleId,
              authorizationId: projectAuthorizationId,
            } = getRoleAuthorizationIds({
              type: 'project',
              currentUserRole: projectCurrentUserRole,
              authorizationName,
            });
            if (!projectRoleId || !projectAuthorizationId) return null;

            const projectDao =
              project?.projectByProjectId?.daoByAdminDaoAddress;
            if (!projectDao) return null;
            const assignment = projectDao.assignmentsByDaoAddress.nodes.find(
              a => a?.accountId === id,
            );
            if (!assignment) return null;

            const assignedRes = await getFromCacheOrFetch({
              reactQueryClient,
              query: getAssignedQuery({
                client: signingCosmWasmClient,
                addr: memberAddress,
                roleId: parseInt(assignment.onChainRoleId),
                daoRbamAddress: projectDao.daoRbamAddress,
              }),
            });

            const assigned = assignedRes?.assigned;
            if (!assigned && project.projectByProjectId?.adminDaoAddress) {
              offchainProjectAssignmentsToDelete.push({
                daoAddress: project.projectByProjectId?.adminDaoAddress,
                roleName: assignment.roleName,
              });
              return null;
            }

            return {
              contractAddress: projectDao.daoRbamAddress,
              msg: {
                execute_actions: {
                  actions: removeMemberActions({
                    daoRbamAddress: projectDao.daoRbamAddress,
                    cw4GroupAddress: projectDao.cw4GroupAddress,
                    authorizationId: projectAuthorizationId,
                    roleId: projectRoleId,
                    memberAddress,
                    memberRoleId: parseInt(assignment.onChainRoleId),
                  }),
                },
              },
            };
          })
          .filter(Boolean) || [],
      )) as ExecuteInstruction[];

      try {
        setProcessingModal(atom => void (atom.open = true));
        const executions = [
          orgExecuteInstruction,
          ...projectExecuteInstructions,
        ].filter(Boolean) as ExecuteInstruction[];

        if (executions.length > 0) {
          const msgs = executions.map(instruction =>
            getMsgExecuteContract({
              walletAddress: wallet?.address,
              contract: instruction.contractAddress,
              executeActionsMsg: instruction.msg,
            }),
          );

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
        } else if (!assigned) {
          await deleteAssignment({
            variables: {
              input: { daoAddress, roleName: role, accountId: id },
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
          accountId: id,
          shouldFindAssignment: false,
        });
        if (delAssignmentsRes.every(res => res.status === 'fulfilled')) {
          setErrorBannerText(_(MEMBER_REMOVED));
        }
      } catch (e) {
        setProcessingModal(atom => void (atom.open = false));
        setErrorBannerText(String(e));
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
      projectsCurrentUserCanManageMembers,
      setErrorBannerText,
      _,
      deleteAssignment,
      reactQueryClient,
      refetchMembers,
      checkErrors,
      setProcessingModal,
      signAndBroadcast,
      feeGranter,
      onTxErrorCallback,
    ],
  );

  const removeMemberOffChain = useCallback(
    async (id: string, role: BaseMemberRole) => {
      if (!daoAddress) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }
      try {
        await deleteAssignment({
          variables: { input: { daoAddress, roleName: role, accountId: id } },
        });
        await reactQueryClient.invalidateQueries({
          queryKey: getDaoByAddressWithAssignmentsQueryKey({
            address: daoAddress,
          }),
        });
      } catch (e) {
        setErrorBannerText(String(e));
        return;
      }

      if (projectsCurrentUserCanManageMembers) {
        const projectsRes = await Promise.allSettled(
          projectsCurrentUserCanManageMembers.map(async project => {
            if (!project) return;
            const projectDaoAddress =
              project?.projectByProjectId?.adminDaoAddress;
            const projectRoleName =
              project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress.nodes?.find(
                a => a?.accountId === id,
              )?.roleName;
            if (!projectDaoAddress || !projectRoleName) return;
            try {
              await deleteAssignment({
                variables: {
                  input: {
                    daoAddress: projectDaoAddress,
                    roleName: projectRoleName,
                    accountId: id,
                  },
                },
              });
            } catch (e) {
              setErrorBannerText(String(e));
              return;
            }

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
        if (projectsRes.every(res => res.status === 'fulfilled')) {
          setErrorBannerText(_(MEMBER_REMOVED));
        }
      }
    },
    [
      daoAddress,
      projectsCurrentUserCanManageMembers,
      setErrorBannerText,
      _,
      deleteAssignment,
      reactQueryClient,
      checkProjectsErrors,
    ],
  );

  const removeMember = useCallback(
    async (id: string) => {
      const member = members.find(m => m.id === id);
      if (!member) {
        setErrorBannerText(_(MEMBER_NOT_FOUND));
        return;
      }
      const {
        onChainRoleId: memberRoleId,
        address: memberAddress,
        role,
      } = member;

      if (memberAddress) {
        await removeMemberWithWalletAddress(
          id,
          role as BaseMemberRole,
          memberRoleId,
          memberAddress,
        );
      } else {
        await removeMemberOffChain(id, role as BaseMemberRole);
      }
    },
    [
      members,
      removeMemberWithWalletAddress,
      removeMemberOffChain,
      setErrorBannerText,
      _,
    ],
  );

  return removeMember;
}
