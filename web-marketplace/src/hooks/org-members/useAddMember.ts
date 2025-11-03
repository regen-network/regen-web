import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { useLingui } from '@lingui/react';

import { useWallet } from 'lib/wallet/wallet';
import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { getOrganizationByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationByDaoAddressQuery/getOrganizationByDaoAddressQuery.utils';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { postData } from 'utils/fetch/postData';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import type { MemberData } from 'components/organisms/OrganizationMembers/OrganizationMembers.BaseTable';
import { useMembersContext } from './useMembersContext';
import { addMemberActions, getNewRoleId } from './utils';
import { MISSING_REQUIRED_PARAMS } from './constants';
import { MembersHookParams } from './types';

export function useAddMember(params: MembersHookParams) {
  const { daoAddress, daoRbamAddress, cw4GroupAddress, currentUserRole } =
    params;
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const { activeAccountId } = useAuth();
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const {
    projectsCurrentUserCanManageMembers,
    roleId,
    authorizationId,
    projectRoleId,
    projectAuthorizationId,
    refetchMembers,
  } = useMembersContext(params);

  const addMember = useCallback(
    async (data: MemberData) => {
      const { role, addressOrEmail, visible } = data;
      const isWalletAddr = isValidAddress(addressOrEmail);

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

      const roleIdToAdd = getNewRoleId({ type: 'organization', role });
      const projectRoleIdToAdd = getNewRoleId({ type: 'project', role });

      if (isWalletAddr) {
        const orgExecuteInstruction = {
          contractAddress: daoRbamAddress,
          msg: {
            execute_actions: {
              actions: addMemberActions({
                daoRbamAddress,
                cw4GroupAddress,
                authorizationId,
                roleId,
                memberAddress: addressOrEmail,
                roleIdToAdd,
              }),
            },
          },
        };

        const projectExecuteInstructions = (projectsCurrentUserCanManageMembers
          ?.map(project => {
            const projectDao =
              project?.projectByProjectId?.daoByAdminDaoAddress;
            if (!projectDao) return null;

            // If user is already member of the project,
            const isMemberOfProject =
              projectDao?.assignmentsByDaoAddress?.nodes.some(
                assignment =>
                  assignment?.accountByAccountId?.addr === addressOrEmail,
              );
            // then we keep his/her role there unchanged
            if (isMemberOfProject) return null;

            return {
              contractAddress: projectDao.daoRbamAddress,
              msg: {
                execute_actions: {
                  actions: addMemberActions({
                    daoRbamAddress: projectDao.daoRbamAddress,
                    cw4GroupAddress: projectDao.cw4GroupAddress,
                    authorizationId: projectAuthorizationId,
                    roleId: projectRoleId,
                    memberAddress: addressOrEmail,
                    roleIdToAdd: projectRoleIdToAdd,
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
          await refetchMembers({ address: addressOrEmail, role, visible });
        } catch (e) {
          setProcessingModal(atom => void (atom.open = false));
          setErrorBannerText(String(e));
        }
      } else if (token) {
        try {
          await postData({
            url: `${apiServerUrl}/marketplace/v1/assignments/add-by-email`,
            parseTextResponse: true,
            data: {
              email: addressOrEmail,
              roleName: role,
              daoAddress,
              visible,
              onChainRoleId: roleIdToAdd,
            },
            token,
            retryCsrfRequest,
            onSuccess: async () => {
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByIdQueryKey({
                  id: activeAccountId,
                  daoAccountsOrderBy: params.daoAccountsOrderBy,
                }),
              });
            },
          });
        } catch (e) {
          setErrorBannerText(String(e));
        }

        if (projectsCurrentUserCanManageMembers)
          for (const project of projectsCurrentUserCanManageMembers) {
            if (!project) continue;

            // If user is already member of the project,
            const isMemberOfProject =
              project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress?.nodes.some(
                assignment =>
                  assignment?.accountByAccountId?.privateAccountById?.email ===
                  addressOrEmail,
              );
            // then we keep his/her role there unchanged
            if (isMemberOfProject) continue;

            try {
              await postData({
                url: `${apiServerUrl}/marketplace/v1/assignments/add-by-email`,
                parseTextResponse: true,
                data: {
                  email: addressOrEmail,
                  roleName: role,
                  daoAddress: project?.projectByProjectId?.adminDaoAddress,
                  visible,
                  onChainRoleId: projectRoleIdToAdd,
                },
                token,
                retryCsrfRequest,
                onSuccess: async () => {
                  await reactQueryClient.invalidateQueries({
                    queryKey: getOrganizationByDaoAddressQueryKey({
                      daoAddress,
                    }),
                  });
                },
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
      projectsCurrentUserCanManageMembers,
      setErrorBannerText,
      _,
      token,
      retryCsrfRequest,
      reactQueryClient,
      activeAccountId,
      refetchMembers,
      params.daoAccountsOrderBy,
    ],
  );

  return addMember;
}
