import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import { useLingui } from '@lingui/react';

import { useAuth } from 'lib/auth/auth';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useUpdateAssignmentMutation } from 'generated/graphql';

import { MEMBER_NOT_FOUND, MISSING_REQUIRED_PARAMS } from './constants';
import { MembersHookParams } from './types';

export function useUpdateMemberVisibility(
  params: Pick<
    MembersHookParams,
    'daoAddress' | 'members' | 'daoAccountsOrderBy'
  >,
) {
  const { daoAddress, members } = params;
  const { _ } = useLingui();
  const { activeAccountId } = useAuth();
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const [updateAssignment] = useUpdateAssignmentMutation();

  const updateVisibility = useCallback(
    async (id: string, visible: boolean) => {
      if (!daoAddress) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }
      const member = members.find(m => m.id === id);
      if (!member) {
        setErrorBannerText(_(MEMBER_NOT_FOUND));
        return;
      }
      const { role: roleName } = member;
      try {
        await updateAssignment({
          variables: {
            input: {
              daoAddress,
              roleName,
              accountId: id,
              assignmentPatch: { visible },
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
    },
    [
      daoAddress,
      setErrorBannerText,
      _,
      members,
      updateAssignment,
      reactQueryClient,
      activeAccountId,
      params.daoAccountsOrderBy,
    ],
  );

  return updateVisibility;
}
