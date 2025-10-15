import {
  BaseProps,
  OrganizationMembersBase,
} from '../OrganizationMembers.BaseTable';

export const OrganizationMembersInviteTable = ({
  members,
  sortDir,
  onToggleSort,
  onUpdateRole,
  onUpdateVisibility,
  onRemove,
  onAddMember,
  accounts,
  setDebouncedValue,
  onSaveProfile,
}: BaseProps): JSX.Element => {
  return (
    <OrganizationMembersBase
      variant="invite"
      members={members}
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      onUpdateRole={onUpdateRole}
      onUpdateVisibility={onUpdateVisibility}
      onRemove={onRemove}
      onAddMember={onAddMember}
      accounts={accounts}
      setDebouncedValue={setDebouncedValue}
      onSaveProfile={onSaveProfile}
    />
  );
};
