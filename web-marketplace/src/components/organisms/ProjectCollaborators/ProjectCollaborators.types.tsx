import { useMigrateProject } from 'legacy-pages/Dashboard/MyProjects/hooks/useMigrateProject';

import { AccountsOrderBy } from 'generated/graphql';

import { useDaoOrganizations } from 'hooks/useDaoOrganizations';

import {
  Member,
  MemberData,
  ProjectRole,
} from '../BaseMembersTable/BaseMembersTable.types';

export type Collaborator = Member & { canEditOrgRole?: boolean };
export interface ProjectCollaboratorsProps {
  collaborators: Collaborator[];
  onAddMember: (data: MemberData<ProjectRole>) => Promise<void>;
  sortDir?: AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc;
  onToggleSort: () => void;
  onUpdateRole: (id: string, role: ProjectRole) => void;
  onRemove: (id: string) => Promise<void>;
  onEditOrgRole: () => void;
  isProjectDao: boolean;
  organizations: ReturnType<typeof useDaoOrganizations>;
  // eligibleOrganizations are the organizations where the user has permissions to migrate the project to
  eligibleOrganizations: ReturnType<typeof useDaoOrganizations>;
  migrateProject: ReturnType<typeof useMigrateProject>['migrateProject'];
  createOrganization: () => void;
  offChainId?: string | null;
  currentDaoAddress?: string;
  isDraftOnChainProject: boolean;
}
