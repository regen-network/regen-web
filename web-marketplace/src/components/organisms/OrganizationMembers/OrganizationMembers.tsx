import {
  BaseProps,
  OrganizationMembersBase,
} from './OrganizationMembers.BaseTable';

export const OrganizationMembers = ({
  members,
  sortDir,
  onToggleSort,
  onUpdateRole,
  onUpdateVisibility,
  onRemove,
  setDebouncedValue,
  onAddMember,
}: BaseProps) => {
  return (
    <OrganizationMembersBase
      variant="standard"
      members={members}
      onAddMember={onAddMember}
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      onUpdateRole={onUpdateRole}
      onUpdateVisibility={onUpdateVisibility}
      onRemove={onRemove}
      setDebouncedValue={setDebouncedValue}
    />
  );
};
