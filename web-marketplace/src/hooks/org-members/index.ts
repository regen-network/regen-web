import { MembersHookParams } from './types';
import { useAddMember } from './useAddMember';
import { useRemoveMember } from './useRemoveMember';
import { useUpdateMemberRole } from './useUpdateMemberRole';
import { useUpdateMemberVisibility } from './useUpdateMemberVisibility';

export function useUpdateMembers(params: MembersHookParams) {
  const addMember = useAddMember(params);
  const removeMember = useRemoveMember(params);
  const updateRole = useUpdateMemberRole(params);
  const updateVisibility = useUpdateMemberVisibility({
    daoAddress: params.daoAddress,
    members: params.members,
    daoAccountsOrderBy: params.daoAccountsOrderBy,
  });
  return { addMember, removeMember, updateRole, updateVisibility };
}
