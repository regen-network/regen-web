import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';

export type Member = {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  role: BaseMemberRole;
  avatar?: string;
  visible: boolean;
  isCurrentUser?: boolean;
};
export interface MemberRoleDropdownProps {
  role: BaseMemberRole;
  disabled?: boolean;
  onChange: (newRole: BaseMemberRole) => void;
  isCurrentUser?: boolean;
}
