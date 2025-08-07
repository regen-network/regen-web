import {
  BaseMemberRole,
  ProjectRole,
} from '../BaseMembersTable/BaseMembersTable.types';

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  description?: string;
  organization?: string;
  projectRole: ProjectRole;
  orgRole?: BaseMemberRole;
  avatar?: string;
  isCurrentUser?: boolean;
  isExternalAdmin?: boolean;
}

export interface ProjectCollaboratorsProps {
  collaborators?: Collaborator[];
  onInvite?: () => void;
  onRoleChange?: (collaboratorId: string, newRole: ProjectRole) => void;
  onRemove?: (collaboratorId: string) => void;
}

export interface RoleDropdownProps {
  projectRole: ProjectRole;
  orgRole?: BaseMemberRole;
  currentUserRole?: ProjectRole; // Optional prop to pass the current user's role
  onChange: (newRole: ProjectRole) => void;
  disabled?: boolean;
  isCurrentUser?: boolean;
  isExternalAdmin?: boolean;
}
