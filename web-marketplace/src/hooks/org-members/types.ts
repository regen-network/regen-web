import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { Member } from 'components/organisms/OrganizationMembers/OrganizationMembers.types';

export type RefetchMembersParams = {
  address: string;
  role: string;
  visible?: boolean;
  accountId?: string;
  shouldFindAssignment?: boolean;
};

export type MembersHookParams = {
  currentUserRole?: BaseMemberRole;
  daoAddress?: string;
  daoRbamAddress?: string;
  cw4GroupAddress?: string;
  members: Member[];
};
