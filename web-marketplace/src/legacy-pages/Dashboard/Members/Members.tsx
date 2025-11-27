import { useInviteMember } from 'components/organisms/BaseMembersTable/modals/hooks/useInviteMember';
import { OrganizationMembers } from 'components/organisms/OrganizationMembers/OrganizationMembers';
import { useUpdateMembers } from 'hooks/org-members';
import { useMembers } from 'hooks/org-members/useMembers';

export const Members = () => {
  const { dao, members, currentUserRole, daoAccountsOrderBy, toggleSort } =
    useMembers();

  const { addMember, removeMember, updateRole, updateVisibility } =
    useUpdateMembers({
      currentUserRole,
      daoAddress: dao?.address,
      daoRbamAddress: dao?.daoRbamAddress,
      cw4GroupAddress: dao?.cw4GroupAddress,
      members,
      daoAccountsOrderBy,
      feeGranter: dao?.address,
    });

  const { setDebouncedValue, accounts, daoData, saveProfile, onUpload } =
    useInviteMember();

  return (
    <OrganizationMembers
      members={members}
      onToggleSort={toggleSort}
      onUpdateRole={updateRole}
      onUpdateVisibility={updateVisibility}
      sortDir={daoAccountsOrderBy}
      onAddMember={addMember}
      onRemove={removeMember}
      accounts={accounts}
      setDebouncedValue={setDebouncedValue}
      onSaveProfile={saveProfile}
      onUpload={onUpload}
      daoWithAddress={daoData?.daoByAddress}
    />
  );
};
