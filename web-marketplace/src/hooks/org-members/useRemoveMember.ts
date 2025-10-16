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
import { useDeleteAssignmentMutation } from 'generated/graphql';

import { removeMemberActions } from './utils';
import { MEMBER_NOT_FOUND, MISSING_REQUIRED_PARAMS } from './constants';
import { useMembersContext } from './useMembersContext';
import { AssignmentToDelete, MembersHookParams } from './types';
import { getAssignedQuery } from 'lib/queries/react-query/cosmwasm/dao-rbam/getAssignedQuery/getAssignedQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

export function useRemoveMember(params: MembersHookParams) {
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
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const {
    projectAuthorizationId,
    projectRoleId,
    roleId,
    authorizationId,
    projectsCurrentUserCanManageMembers,
    refetchMembers,
  } = useMembersContext(params);

  const removeMember = useCallback(
    async (id: string) => {
      if (
        !wallet?.address ||
        !signingCosmWasmClient ||
        !daoAddress ||
        !daoRbamAddress ||
        !cw4GroupAddress ||
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
        onChainRoleId: memberRoleId,
        address: memberAddress,
        role,
      } = member;

      if (memberAddress) {
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
                  }),
                },
              },
            }
          : undefined;

        const offchainProjectAssignmentsToDelete: AssignmentToDelete[] = [];
        const projectExecuteInstructions = (await Promise.all(
          projectsCurrentUserCanManageMembers
            ?.map(async project => {
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
                  roleId: assignment.onChainRoleId,
                  daoRbamAddress,
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
                contractAddress: project?.projectByProjectId?.adminDaoAddress,
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
            await signingCosmWasmClient.executeMultiple(
              wallet.address,
              executions,
              2,
            );
          }
          if (!assigned) {
            await deleteAssignment({
              variables: {
                input: { daoAddress, roleName: role, accountId: id },
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
            accountId: id,
            shouldFindAssignment: false,
          });
        } catch (e) {
          setProcessingModal(atom => void (atom.open = false));
          setErrorBannerText(String(e));
        }
      } else {
        try {
          await deleteAssignment({
            variables: { input: { daoAddress, roleName: role, accountId: id } },
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
              const projectRoleName =
                project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress.nodes?.find(
                  a => a?.accountId === id,
                )?.roleName;
              if (!projectDaoAddress || !projectRoleName) return;
              await deleteAssignment({
                variables: {
                  input: {
                    daoAddress: projectDaoAddress,
                    roleName: projectRoleName,
                    accountId: id,
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
      deleteAssignment,
      reactQueryClient,
      activeAccountId,
      setProcessingModal,
      refetchMembers,
      params.daoAccountsOrderBy,
    ],
  );

  return removeMember;
}
