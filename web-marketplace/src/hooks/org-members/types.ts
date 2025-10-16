import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { Member } from 'components/organisms/OrganizationMembers/OrganizationMembers.types';
import { AccountsOrderBy } from 'generated/graphql';

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
  daoAccountsOrderBy: AccountsOrderBy;
};

export type AssignmentToDelete = {
  daoAddress: string;
  roleName: string;
};
