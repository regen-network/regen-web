import { ProjectRole } from '../BaseMembersTable/BaseMembersTable.types';

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  description?: string;
  organization?: string;
  role: ProjectRole;
  avatar?: string;
  isCurrentUser?: boolean;
  hasWalletAddress: boolean;
}

export interface ProjectCollaboratorsProps {
  collaborators: Collaborator[];
  onInvite: () => void;
  sortDir?: 'asc' | 'desc';
  onToggleSort: () => void;
  onUpdateRole: (id: string, role: ProjectRole) => void;
  onRemove: (id: string) => void;
  onEditOrgRole: () => void;
}
