import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getMsgExecuteContract } from 'utils/cosmwasm';

import {
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} from 'generated/graphql';
import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { getAssignedQuery } from 'lib/queries/react-query/cosmwasm/dao-rbam/getAssignedQuery/getAssignedQuery';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';
import { getOrganizationProjectsByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery.utils';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { useWallet } from 'lib/wallet/wallet';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useMsgClient } from 'hooks';
import {
  MEMBER_NOT_FOUND,
  MISSING_REQUIRED_PARAMS,
  projectRoles,
} from 'hooks/org-members/constants';
import {
  addMemberActions,
  getNewProjectRoleId,
  updateAuthorizationAction,
  updateMemberRoleActions,
} from 'hooks/org-members/utils';

import { CollaboratorsHookParams } from './types';
import { useCollaboratorsContext } from './useCollaboratorsContext';

export function useUpdateCollaboratorRole(params: CollaboratorsHookParams) {
  const {
    daoAddress,
    daoRbamAddress,
    cw4GroupAddress,
    collaborators,
    currentUserRole,
  } = params;
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const [updateAssignment] = useUpdateAssignmentMutation();
  const { signAndBroadcast } = useMsgClient();

  const {
    projectAuthorizationId,
    projectRoleId,
    refetchCollaborators,
    orgDaoAddress,
    feeGranter,
    onTxErrorCallback,
  } = useCollaboratorsContext(params);
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const updateRoleWithWalletAddress = useCallback(
    async (
      id: string,
      role: ProjectRole,
      oldRoleId: number,
      oldRoleName: string,
      memberAddress: string,
    ) => {
      if (
        !wallet?.address ||
        !signingCosmWasmClient ||
        !daoAddress ||
        !daoRbamAddress ||
        !cw4GroupAddress ||
        !role ||
        !currentUserRole ||
        !projectAuthorizationId ||
        !projectRoleId
      ) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const projectNewRoleId = getNewProjectRoleId(role);

      // If we assign member the owner role,
      // it means we need to downgrade current user to admin
      // and update the 'can_manage_members_except_owner' authorization to use the new owner address
      const projectOwnerActions =
        role === ROLE_OWNER
          ? [
              ...updateMemberRoleActions({
                daoRbamAddress,
                authorizationId: projectAuthorizationId,
                roleId: projectRoleId,
                memberAddress: wallet.address,
                newRoleId: getNewProjectRoleId(ROLE_ADMIN),
                oldRoleId: getNewProjectRoleId(ROLE_OWNER),
              }),
              updateAuthorizationAction({
                daoRbamAddress,
                cw4GroupAddress,
                roleId: projectRoleId,
                authorizationId: projectAuthorizationId,
                newOwnerAddress: memberAddress,
                authorizationIdToUpdate: projectRoles['admin'].authorizations[
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
            authorizationId: projectAuthorizationId,
            roleId: projectRoleId,
            memberAddress,
            newRoleId: projectNewRoleId,
            oldRoleId,
          })
        : addMemberActions({
            daoRbamAddress,
            cw4GroupAddress,
            authorizationId: projectAuthorizationId,
            roleId: projectRoleId,
            memberAddress,
            roleIdToAdd: projectNewRoleId,
          });

      try {
        const executeMsg = getMsgExecuteContract({
          walletAddress: wallet?.address,
          contract: daoRbamAddress,
          executeActionsMsg: {
            execute_actions: {
              actions: [...memberRoleActions, ...projectOwnerActions],
            },
          },
        });

        await signAndBroadcast(
          {
            msgs: [executeMsg],
            fee: 'auto',
            feeGranter,
          },
          () => setProcessingModal(atom => void (atom.open = true)),
          {
            onError: (e?: Error) => {
              onTxErrorCallback(e);
            },
            onSuccess: async () => {
              // revoking the old role if it was only off chain
              if (!assigned) {
                await deleteAssignment({
                  variables: {
                    input: { daoAddress, roleName: oldRoleName, accountId: id },
                  },
                });
              }
              await refetchCollaborators({
                address: memberAddress,
                role,
                accountId: id,
              });
            },
          },
        );
      } catch (e) {
        setProcessingModal(atom => void (atom.open = false));
        setErrorBannerText(String(e));
      }
    },
    [
      wallet,
      signingCosmWasmClient,
      signAndBroadcast,
      daoAddress,
      daoRbamAddress,
      cw4GroupAddress,
      currentUserRole,
      projectAuthorizationId,
      projectRoleId,
      reactQueryClient,
      deleteAssignment,
      refetchCollaborators,
      setProcessingModal,
      setErrorBannerText,
      _,
      feeGranter,
      onTxErrorCallback,
    ],
  );

  const updateRoleOffChain = useCallback(
    async (id: string, role: ProjectRole, oldRoleName: string) => {
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
        if (orgDaoAddress)
          await reactQueryClient.invalidateQueries({
            queryKey: getOrganizationProjectsByDaoAddressQueryKey({
              daoAddress: orgDaoAddress,
            }),
          });
      } catch (e) {
        setErrorBannerText(String(e));
      }
    },
    [
      daoAddress,
      reactQueryClient,
      updateAssignment,
      setErrorBannerText,
      _,
      orgDaoAddress,
    ],
  );

  const updateRole = useCallback(
    async (id: string, role: ProjectRole) => {
      const collaborator = collaborators.find(m => m.id === id);
      if (!collaborator) {
        setErrorBannerText(_(MEMBER_NOT_FOUND));
        return;
      }
      const {
        role: oldRoleName,
        onChainRoleId: oldRoleId,
        address: collaboratorAddress,
      } = collaborator;

      if (collaboratorAddress) {
        await updateRoleWithWalletAddress(
          id,
          role,
          oldRoleId,
          oldRoleName,
          collaboratorAddress,
        );
      } else {
        await updateRoleOffChain(id, role, oldRoleName);
      }
    },
    [
      collaborators,
      updateRoleWithWalletAddress,
      updateRoleOffChain,
      setErrorBannerText,
      _,
    ],
  );

  return updateRole;
}
