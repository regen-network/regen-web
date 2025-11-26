import { useCallback } from 'react';
import type { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import {
  MemberData,
  ProjectRole,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

import { useCollaboratorsContext } from './useCollaboratorsContext';
import { addMemberActions, getNewProjectRoleId } from 'hooks/org-members/utils';
import { MISSING_REQUIRED_PARAMS } from 'hooks/org-members/constants';
import { CollaboratorsHookParams } from './types';

export function useAddCollaborator(params: CollaboratorsHookParams) {
  const { daoAddress, daoRbamAddress, cw4GroupAddress, currentUserRole } =
    params;
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const { projectRoleId, projectAuthorizationId, refetchMembers } =
    useCollaboratorsContext(params);

  const addCollaboratorWithWalletAddress = useCallback(
    async (data: MemberData<ProjectRole>, projectRoleIdToAdd: number) => {
      const { role, addressOrEmail, visible } = data;

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

      try {
        setProcessingModal(atom => void (atom.open = true));
        await signingCosmWasmClient.execute(
          wallet.address,
          daoRbamAddress,
          {
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
          2,
        );
        await refetchMembers({ address: addressOrEmail, role, visible });
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
      projectAuthorizationId,
      projectRoleId,
      setErrorBannerText,
      _,
      refetchMembers,
      setProcessingModal,
    ],
  );

  const addCollaboratorOffChain = useCallback(
    async (data: MemberData<ProjectRole>, projectRoleIdToAdd: number) => {
      if (!daoAddress || !token) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const { role, addressOrEmail, visible } = data;
      try {
        await postData({
          url: `${apiServerUrl}/marketplace/v1/assignments/add-by-email`,
          parseTextResponse: true,
          data: {
            email: addressOrEmail,
            roleName: role,
            daoAddress,
            visible,
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
