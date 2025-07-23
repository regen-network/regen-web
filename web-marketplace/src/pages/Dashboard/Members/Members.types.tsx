export type MemberRole = 'admin' | 'editor' | 'viewer';

export interface Member {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  role: MemberRole;
  avatar?: string;
  visible: boolean;
  isCurrentUser?: boolean;
}
