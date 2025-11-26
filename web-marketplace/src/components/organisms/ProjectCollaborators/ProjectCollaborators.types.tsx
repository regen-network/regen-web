import { AccountsOrderBy } from 'generated/graphql';

import {
  Member,
  MemberData,
  ProjectRole,
} from '../BaseMembersTable/BaseMembersTable.types';

export interface ProjectCollaboratorsProps {
  collaborators: Member[];
  onAddMember: (data: MemberData<ProjectRole>) => Promise<void>;
  sortDir?: AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc;
  onToggleSort: () => void;
  onUpdateRole: (id: string, role: ProjectRole) => void;
  onRemove: (id: string) => Promise<void>;
  onEditOrgRole: () => void;
  isProjectDao: boolean;
  canMigrate: boolean;
  partOfOrganization: boolean;
  migrateProject?: () => Promise<void>;
  createOrganization: () => void;
}
