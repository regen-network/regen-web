export type BaseMemberRole = 'owner' | 'admin' | 'editor' | 'viewer';
export type ProjectRole = BaseMemberRole | 'author';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isCurrentUser?: boolean;
}

export interface BaseTableProps<T extends BaseUser> {
  users: T[];
  currentUserRole: string;
  onInvite?: () => void;
  onRoleChange?: (userId: string, newRole: any) => void;
  onRemove?: (userId: string) => void;
  onVisibilityChange?: (userId: string, visible: boolean) => void;
  title: string;
  description: string;
  inviteButtonText: string;
  canAdmin: boolean;
  context: Context;
}

export interface BaseRoleDropdownProps {
  role: string;
  disabled?: boolean;
  onChange: (newRole: any) => void;
  isCurrentUser?: boolean;
  tooltipTitle?: string;
}

export interface RoleOption {
  key: string;
  label: any;
  Icon: React.FC<any>;
  description: any;
}

export type Context = 'organization' | 'project';
