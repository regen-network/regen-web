import { AccountsOrderBy } from 'generated/graphql';

import {
  Member,
  ProjectRole,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

export type RefetchCollaboratorsParams = {
  address: string;
  role: string;
  accountId?: string;
  shouldFindAssignment?: boolean;
};

export type CollaboratorsHookParams = {
  currentUserRole?: ProjectRole;
  daoAddress?: string;
  daoRbamAddress?: string;
  cw4GroupAddress?: string;
  collaborators: Member[];
  daoAccountsOrderBy: AccountsOrderBy;
};
