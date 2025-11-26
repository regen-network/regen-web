export type BaseMemberRole = 'owner' | 'admin' | 'editor' | 'viewer';
export type ProjectRole = BaseMemberRole | 'author';

export interface BaseUser {
  id: string;
  name: string;
  email?: string | null;
  avatar?: string;
  isCurrentUser?: boolean;
}

export interface BaseRoleDropdownProps {
  role: string;
  onChange: (newRole: any) => void;
  roleOptions: RoleOption[];
  currentUserRole?: string;
  disabled?: boolean;
  hasWalletAddress: boolean;
  placeholder?: string;
  height?: string;
  fullWidth?: boolean;
}

export interface RoleOption {
  key: ProjectRole;
  label: string;
  Icon: React.FC<any>;
  description: string;
}

export type Context = 'organization' | 'project';

export type Member = {
  id: string;
  name: string;
  email?: string | null;
  address?: string | null;
  title?: string | null;
  organization?: string;
  role: BaseMemberRole | ProjectRole;
  onChainRoleId: number;
  avatar?: string;
  visible: boolean;
  isCurrentUser?: boolean;
  hasWalletAddress: boolean;
};

export type MemberData<T> = {
  role: T | undefined;
  addressOrEmail: string;
  visible: boolean;
};
