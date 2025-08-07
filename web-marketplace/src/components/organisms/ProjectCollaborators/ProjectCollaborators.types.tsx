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
}

export interface ProjectCollaboratorsProps {
  collaborators?: Collaborator[];
  onInvite?: () => void;
  onRoleChange?: (collaboratorId: string, newRole: ProjectRole) => void;
  onRemove?: (collaboratorId: string) => void;
}
