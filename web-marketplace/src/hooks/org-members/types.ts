import { AccountsOrderBy } from 'generated/graphql';

import {
  BaseMemberRole,
  Member,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

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
  feeGranter?: string;
};

export type AssignmentToDelete = {
  daoAddress: string;
  roleName: string;
};
