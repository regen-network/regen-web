import { UseStateSetter } from 'web-components/src/types/react/useState';
import { BaseMemberRole } from '../../BaseMembersTable/BaseMembersTable.types';
import {
  BaseProps,
  OrganizationMembersBase,
} from '../OrganizationMembers.BaseTable';
import { Member } from '../OrganizationMembers.types';

export const OrganizationMembersInviteTable = ({
  members,
  onInvite,
  sortDir,
  onToggleSort,
  onUpdateRole,
  onUpdateVisibility,
  onRemove,
  onAddMember,
  accounts,
  setDebouncedValue,
}: BaseProps): JSX.Element => {
  return (
    <OrganizationMembersBase
      variant="invite"
      members={members}
      onInvite={onInvite}
      sortDir={sortDir}
      onToggleSort={onToggleSort}
      onUpdateRole={onUpdateRole}
      onUpdateVisibility={onUpdateVisibility}
      onRemove={onRemove}
      onAddMember={onAddMember}
      accounts={accounts}
      setDebouncedValue={setDebouncedValue}
    />
  );
};
