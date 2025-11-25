import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { useUpdateAssignmentMutation } from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';

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
          queryKey: getDaoByAddressWithAssignmentsQueryKey({
            address: daoAddress,
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
    ],
  );

  return updateVisibility;
}
