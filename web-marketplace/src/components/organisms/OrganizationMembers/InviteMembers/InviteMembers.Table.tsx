import { BaseMemberRole } from '../../BaseMembersTable/BaseMembersTable.types';
import { OrganizationMembersBase } from '../OrganizationMembers.BaseTable';
import { Member } from '../OrganizationMembers.types';

type Props = {
  members: Member[];
  onInvite: () => void;
  sortDir?: 'asc' | 'desc';
  onToggleSort: () => void;
  onUpdateRole: (id: string, role: BaseMemberRole) => void;
  onUpdateVisibility: (id: string, visible: boolean) => void;
  onRemove: (id: string) => void;
  onAddMember?: (data: {
    role: BaseMemberRole | undefined;
    addressOrEmail: string;
    visible: boolean;
  }) => void;
  accounts?: any;
  setDebouncedValue?: (value: string) => void;
};

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
}: Props): JSX.Element => {
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
