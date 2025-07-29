export type MemberRole = 'admin' | 'editor' | 'viewer';

export type Member = {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  role: MemberRole;
  avatar?: string;
  visible: boolean;
  isCurrentUser?: boolean;
};
export interface MemberRoleDropdownProps {
  role: MemberRole;
  disabled?: boolean;
  onChange: (newRole: MemberRole) => void;
  isCurrentUser?: boolean;
}
