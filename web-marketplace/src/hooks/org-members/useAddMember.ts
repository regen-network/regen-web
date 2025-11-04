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
import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { getOrganizationByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationByDaoAddressQuery/getOrganizationByDaoAddressQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import type { MemberData } from 'components/organisms/OrganizationMembers/OrganizationMembers.BaseTable';

import { MISSING_REQUIRED_PARAMS } from './constants';
import { MembersHookParams } from './types';
import { useMembersContext } from './useMembersContext';
import { addMemberActions, getNewRoleId } from './utils';

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
    checkProjectsErrors,
  } = useMembersContext(params);

  const addMemberWithWalletAddress = useCallback(
    async (
      data: MemberData,
      roleIdToAdd: number,
      projectRoleIdToAdd: number,
    ) => {
      const { role, addressOrEmail, visible } = data;

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
          const projectDao = project?.projectByProjectId?.daoByAdminDaoAddress;
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
      refetchMembers,
      setProcessingModal,
    ],
  );

  const addMemberOffChain = useCallback(
    async (
      data: MemberData,
      roleIdToAdd: number,
      projectRoleIdToAdd: number,
    ) => {
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

      if (projectsCurrentUserCanManageMembers) {
        const projectsFiltered = projectsCurrentUserCanManageMembers.filter(
          project => {
            if (!project) return false;
            // If user is already member of the project,
            const isMemberOfProject =
              project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress?.nodes.some(
                assignment =>
                  assignment?.accountByAccountId?.privateAccountById?.email ===
                  addressOrEmail,
              );
            // then we keep his/her role there unchanged
            return !isMemberOfProject;
          },
        );
        const projectsRes = await Promise.allSettled(
          projectsFiltered.map(
            async project =>
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
              }),
          ),
        );
        checkProjectsErrors(projectsRes, projectsFiltered);
      }
    },
    [
      daoAddress,
      token,
      setErrorBannerText,
      _,
      reactQueryClient,
      activeAccountId,
      params.daoAccountsOrderBy,
      projectsCurrentUserCanManageMembers,
      retryCsrfRequest,
      checkProjectsErrors,
    ],
  );

  const addMember = useCallback(
    async (data: MemberData) => {
      const { role, addressOrEmail } = data;
      const isWalletAddr = isValidAddress(addressOrEmail);

      if (!role) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const roleIdToAdd = getNewRoleId({ type: 'organization', role });
      const projectRoleIdToAdd = getNewRoleId({ type: 'project', role });

      if (isWalletAddr) {
        await addMemberWithWalletAddress(data, roleIdToAdd, projectRoleIdToAdd);
      } else if (token) {
        await addMemberOffChain(data, roleIdToAdd, projectRoleIdToAdd);
      }
    },
    [
      addMemberWithWalletAddress,
      addMemberOffChain,
      setErrorBannerText,
      _,
      token,
    ],
  );

  return addMember;
}
