import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getMsgExecuteContract } from 'utils/cosmwasm';
import { postData } from 'utils/fetch/postData';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';
import { getOrganizationProjectsByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationProjectsByDaoAddressQuery/getOrganizationProjectsByDaoAddressQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import {
  MemberData,
  ProjectRole,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useMsgClient } from 'hooks';
import { MISSING_REQUIRED_PARAMS } from 'hooks/org-members/constants';
import { addMemberActions, getNewProjectRoleId } from 'hooks/org-members/utils';

import { CollaboratorsHookParams } from './types';
import { useCollaboratorsContext } from './useCollaboratorsContext';

export function useAddCollaborator(params: CollaboratorsHookParams) {
  const { daoAddress, daoRbamAddress, cw4GroupAddress, currentUserRole } =
    params;
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const { signAndBroadcast } = useMsgClient();

  const {
    projectRoleId,
    projectAuthorizationId,
    refetchCollaborators,
    orgDaoAddress,
    feeGranter,
    onTxErrorCallback,
  } = useCollaboratorsContext(params);

  const addCollaboratorWithWalletAddress = useCallback(
    async (data: MemberData<ProjectRole>, projectRoleIdToAdd: number) => {
      const { role, addressOrEmail } = data;

      if (
        !wallet?.address ||
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

      try {
        const executeMsg = getMsgExecuteContract({
          walletAddress: wallet?.address,
          contract: daoRbamAddress,
          executeActionsMsg: {
            execute_actions: {
              actions: addMemberActions({
                daoRbamAddress,
                cw4GroupAddress,
                authorizationId: projectAuthorizationId,
                roleId: projectRoleId,
                memberAddress: addressOrEmail,
                roleIdToAdd: projectRoleIdToAdd,
                withFeegrant: true,
                daoAddress,
              }),
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
            onError: onTxErrorCallback,
            onSuccess: async () => {
              await refetchCollaborators({ address: addressOrEmail, role });
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
      signAndBroadcast,
      daoAddress,
      daoRbamAddress,
      cw4GroupAddress,
      currentUserRole,
      projectAuthorizationId,
      projectRoleId,
      setErrorBannerText,
      _,
      refetchCollaborators,
      setProcessingModal,
      feeGranter,
      onTxErrorCallback,
    ],
  );

  const addCollaboratorOffChain = useCallback(
    async (data: MemberData<ProjectRole>, projectRoleIdToAdd: number) => {
      if (!daoAddress || !token) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const { role, addressOrEmail } = data;
      try {
        await postData({
          url: `${apiServerUrl}/marketplace/v1/assignments/add-by-email`,
          parseTextResponse: true,
          data: {
            email: addressOrEmail,
            roleName: role,
            daoAddress,
            visible: true,
            onChainRoleId: projectRoleIdToAdd,
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
            if (orgDaoAddress)
              await reactQueryClient.invalidateQueries({
                queryKey: getOrganizationProjectsByDaoAddressQueryKey({
                  daoAddress: orgDaoAddress,
                }),
              });
          },
        });
      } catch (e) {
        setErrorBannerText(String(e));
      }
    },
    [
      daoAddress,
      token,
      setErrorBannerText,
      _,
      reactQueryClient,
      params.daoAccountsOrderBy,
      retryCsrfRequest,
      orgDaoAddress,
    ],
  );

  const addCollaborator = useCallback(
    async (data: MemberData<ProjectRole>) => {
      const { role, addressOrEmail } = data;
      const isWalletAddr = isValidAddress(addressOrEmail);

      if (!role) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const projectRoleIdToAdd = getNewProjectRoleId(role);

      if (isWalletAddr) {
        await addCollaboratorWithWalletAddress(data, projectRoleIdToAdd);
      } else if (token) {
        await addCollaboratorOffChain(data, projectRoleIdToAdd);
      }
    },
    [
      addCollaboratorWithWalletAddress,
      addCollaboratorOffChain,
      setErrorBannerText,
      _,
      token,
    ],
  );

  return addCollaborator;
}
