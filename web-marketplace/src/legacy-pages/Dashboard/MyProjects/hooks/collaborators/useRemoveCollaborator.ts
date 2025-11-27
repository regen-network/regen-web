import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getMsgExecuteContract } from 'utils/cosmwasm';

import { useDeleteAssignmentMutation } from 'generated/graphql';
import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { getAssignedQuery } from 'lib/queries/react-query/cosmwasm/dao-rbam/getAssignedQuery/getAssignedQuery';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';
import { getOrganizationProjectsByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery.utils';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useMsgClient } from 'hooks';
import {
  MEMBER_NOT_FOUND,
  MISSING_REQUIRED_PARAMS,
} from 'hooks/org-members/constants';
import { removeMemberActions } from 'hooks/org-members/utils';

import { MEMBER_REMOVED } from './constants';
import { CollaboratorsHookParams } from './types';
import { useCollaboratorsContext } from './useCollaboratorsContext';

export function useRemoveCollaborator(params: CollaboratorsHookParams) {
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
  const [deleteAssignment] = useDeleteAssignmentMutation();
  const { signAndBroadcast } = useMsgClient();

  const {
    projectAuthorizationId,
    projectRoleId,
    refetchCollaborators,
    orgDaoAddress,
    feeGranter,
    onTxErrorCallback,
  } = useCollaboratorsContext(params);

  const removeCollaboratorOffChain = useCallback(
    async (id: string, role: ProjectRole) => {
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
        if (orgDaoAddress)
          await reactQueryClient.invalidateQueries({
            queryKey: getOrganizationProjectsByDaoAddressQueryKey({
              daoAddress: orgDaoAddress,
            }),
          });
        setErrorBannerText(_(MEMBER_REMOVED));
      } catch (e) {
        setErrorBannerText(String(e));
      }
    },
    [
      daoAddress,
      setErrorBannerText,
      _,
      deleteAssignment,
      reactQueryClient,
      orgDaoAddress,
    ],
  );

  const removeCollaboratorWithWalletAddress = useCallback(
    async (
      id: string,
      role: ProjectRole,
      collaboratorRoleId: number,
      collaboratorAddress: string,
    ) => {
      if (
        !wallet?.address ||
        !signingCosmWasmClient ||
        !daoAddress ||
        !daoRbamAddress ||
        !cw4GroupAddress ||
        !currentUserRole ||
        !projectAuthorizationId ||
        !projectRoleId
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
          addr: collaboratorAddress as string,
          roleId: collaboratorRoleId,
          daoRbamAddress,
          enabled: !!collaboratorAddress,
        }),
      });
      const assigned = assignedRes?.assigned;

      const msg = assigned
        ? {
            execute_actions: {
              actions: removeMemberActions({
                daoRbamAddress,
                cw4GroupAddress,
                authorizationId: projectAuthorizationId,
                roleId: projectRoleId,
                memberAddress: collaboratorAddress,
                memberRoleId: collaboratorRoleId,
                withFeegrant: true,
                daoAddress,
              }),
            },
          }
        : undefined;

      try {
        setProcessingModal(atom => void (atom.open = true));

        if (msg) {
          const executeMsg = getMsgExecuteContract({
            walletAddress: wallet?.address,
            contract: daoRbamAddress,
            executeActionsMsg: msg,
          });

          await signAndBroadcast(
            {
              msgs: [executeMsg],
              fee: 'auto',
              feeGranter,
            },
            undefined,
            {
              onError: (e?: Error) => {
                onTxErrorCallback(e);
              },
              onSuccess: async () => {
                await refetchCollaborators({
                  address: collaboratorAddress,
                  role,
                  accountId: id,
                  shouldFindAssignment: false,
                });
                setErrorBannerText(_(MEMBER_REMOVED));
              },
            },
          );
        } else if (!assigned) {
          await removeCollaboratorOffChain(id, role);
        }
      } catch (e) {
        setProcessingModal(atom => void (atom.open = false));
        setErrorBannerText(String(e));
      }
    },
    [
      wallet?.address,
      signingCosmWasmClient,
      signAndBroadcast,
      daoAddress,
      daoRbamAddress,
      cw4GroupAddress,
      currentUserRole,
      projectAuthorizationId,
      projectRoleId,
      setErrorBannerText,
      _,
      reactQueryClient,
      refetchCollaborators,
      setProcessingModal,
      feeGranter,
      onTxErrorCallback,
      removeCollaboratorOffChain,
    ],
  );

  const removeCollaborator = useCallback(
    async (id: string) => {
      const collaborator = collaborators.find(m => m.id === id);
      if (!collaborator) {
        setErrorBannerText(_(MEMBER_NOT_FOUND));
        return;
      }
      const {
        onChainRoleId: collaboratorRoleId,
        address: collaboratorAddress,
        role,
      } = collaborator;

      if (collaboratorAddress) {
        await removeCollaboratorWithWalletAddress(
          id,
          role,
          collaboratorRoleId,
          collaboratorAddress,
        );
      } else {
        await removeCollaboratorOffChain(id, role);
      }
    },
    [
      collaborators,
      removeCollaboratorWithWalletAddress,
      removeCollaboratorOffChain,
      setErrorBannerText,
      _,
    ],
  );

  return removeCollaborator;
}
