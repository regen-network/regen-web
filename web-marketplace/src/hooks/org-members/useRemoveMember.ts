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
import { MembersHookParams } from './types';

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
        // TODO how to handle edge case where web2 member was added off-chain only
        // then adds a wallet address to his/her account
        // in this case, the following would fail
        // is it worth querying on chain assignments beforehand?
        // relevant for updateRole too
        const orgExecuteInstruction = {
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
        };

        const projectExecuteInstructions = (projectsCurrentUserCanManageMembers
          ?.map(project => {
            const projectDao =
              project?.projectByProjectId?.daoByAdminDaoAddress;
            if (!projectDao) return null;
            const assignment = projectDao.assignmentsByDaoAddress.nodes.find(
              a => a?.accountId === id,
            );
            if (!assignment) return null;
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
      deleteAssignment,
      reactQueryClient,
      activeAccountId,
      setProcessingModal,
      refetchMembers,
    ],
  );

  return removeMember;
}
