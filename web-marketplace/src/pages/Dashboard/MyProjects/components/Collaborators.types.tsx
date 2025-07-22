export type ProjectRoleType = 'admin' | 'editor' | 'author' | 'viewer';
type OrgRoleType = 'admin' | 'editor' | 'viewer' | '';

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  description?: string;
  organization?: string;
  projectRole: ProjectRoleType;
  orgRole: OrgRoleType;
  avatar?: string;
  isCurrentUser?: boolean;
  isExternalAdmin?: boolean;
}

export interface CollaboratorsManagementProps {
  collaborators?: Collaborator[];
  onInvite?: () => void;
  onRoleChange?: (collaboratorId: string, newRole: ProjectRoleType) => void;
  onRemove?: (collaboratorId: string) => void;
}

export interface RoleDropdownProps {
  projectRole: ProjectRoleType;
  orgRole: OrgRoleType;
  currentUserRole?: ProjectRoleType; // Optional prop to pass the current user's role
  onChange: (newRole: ProjectRoleType) => void;
  disabled?: boolean;
  isCurrentUser?: boolean;
  isExternalAdmin?: boolean;
}

export interface CollaboratorActionsDropdownProps {
  role: ProjectRoleType;
  currentUserRole: ProjectRoleType;
  orgRole?: OrgRoleType;
  isCurrentUser?: boolean;
  onRemove: () => void;
  onEditOrgRole?: () => void;
  onEditTitle?: () => void;
  context?: 'project' | 'members';
  isOnlyAdmin?: boolean;
  isExternalAdmin?: boolean;
}

interface Project {
  id: string;
  name?: string;
  place?: string;
  area?: number;
  areaUnit?: string;
  imgSrc?: string;
  slug?: string;
}

export interface ProjectBannerProps {
  project: Project;
  canEdit?: boolean;
}
