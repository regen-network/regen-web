import { UseStateSetter } from 'web-components/src/types/react/useState';
import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
import { OrganizationMembersBase } from './OrganizationMembers.BaseTable';
import { Member } from './OrganizationMembers.types';

type Props = {
  members: Member[];
  onInvite: () => void;
  sortDir?: 'asc' | 'desc';
  onToggleSort: () => void;
  onUpdateRole: (id: string, role: BaseMemberRole) => void;
  onUpdateVisibility: (id: string, visible: boolean) => void;
  onRemove: (id: string) => void;
  setDebouncedValue: UseStateSetter<string>;
};
export const OrganizationMembers = ({
  members,
  onInvite,
  sortDir,
  onToggleSort,
  onUpdateRole,
  onUpdateVisibility,
  onRemove,
  setDebouncedValue,
}: Props) => {
  return (
    <OrganizationMembersBase
      variant="standard"
      members={members}
      onInvite={onInvite}
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      onUpdateRole={onUpdateRole}
      onUpdateVisibility={onUpdateVisibility}
      onRemove={onRemove}
      setDebouncedValue={setDebouncedValue}
    />
  );
};
