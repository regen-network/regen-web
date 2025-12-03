// AI Generated Code for the most part
import { describe, expect, it } from 'vitest';

import {
  AccountType,
  DaoByAddressWithAssignmentsQuery,
} from 'generated/graphql';

import {
  ROLE_ADMIN,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

import { getOrgAssignments } from './useMigrateProjects.utils';

type AssignmentInput = {
  accountId: string;
  roleName: BaseMemberRole;
  addr?: string | null;
  email?: string | null;
  googleEmail?: string | null;
};

const createOrgAssignmentsData = (
  assignments: AssignmentInput[],
): DaoByAddressWithAssignmentsQuery => ({
  __typename: 'Query',
  daoByAddress: {
    __typename: 'Dao',
    address: 'dao-address',
    daoRbamAddress: 'dao-rbam',
    cw4GroupAddress: 'cw4',
    accountsByAssignmentDaoAddressAndAccountId: {
      __typename:
        'DaoAccountsByAssignmentDaoAddressAndAccountIdManyToManyConnection',
      nodes: assignments.map(assignment => ({
        __typename: 'Account',
        id: assignment.accountId,
        name: '',
        type: AccountType.User,
        image: null,
        addr: assignment.addr ?? null,
        title: null,
        privateAccountById: assignment.email
          ? {
              __typename: 'PrivateAccount',
              email: assignment.email ?? null,
              googleEmail: assignment.googleEmail ?? null,
            }
          : assignment.googleEmail
          ? {
              __typename: 'PrivateAccount',
              email: null,
              googleEmail: assignment.googleEmail,
            }
          : null,
      })),
    },
    assignmentsByDaoAddress: {
      __typename: 'AssignmentsConnection',
      nodes: assignments.map(assignment => ({
        __typename: 'Assignment',
        roleName: assignment.roleName,
        onChainRoleId: 1,
        visible: true,
        accountId: assignment.accountId,
      })),
    },
  },
});

describe('getOrgAssignments', () => {
  it('categorizes on-chain assignments and downgrades existing owner when current user is not owner', () => {
    const data = createOrgAssignmentsData([
      { accountId: 'owner', roleName: ROLE_OWNER, addr: 'owner-addr' },
      { accountId: 'admin', roleName: ROLE_ADMIN, addr: 'admin-addr' },
      { accountId: 'editor', roleName: ROLE_EDITOR, addr: 'editor-addr' },
      { accountId: 'viewer', roleName: ROLE_VIEWER, addr: 'viewer-addr' },
    ]);

    const result = getOrgAssignments(ROLE_ADMIN, data);

    expect(result.adminAssignments).toEqual(
      expect.arrayContaining(['owner-addr', 'admin-addr']),
    );
    expect(result.editorAssignments).toEqual(['editor-addr']);
    expect(result.authorAssignments).toEqual(['author-addr']);
    expect(result.viewerAssignments).toEqual(['viewer-addr']);
  });

  it('does not downgrade existing owner when current user is the org owner', () => {
    const data = createOrgAssignmentsData([
      { accountId: 'owner', roleName: ROLE_OWNER, addr: 'owner-addr' },
      { accountId: 'admin', roleName: ROLE_ADMIN, addr: 'admin-addr' },
    ]);

    const result = getOrgAssignments(ROLE_OWNER, data);

    expect(result.adminAssignments).toEqual(['admin-addr']);
  });

  it('categorizes off-chain assignments by account id', () => {
    const data = createOrgAssignmentsData([
      { accountId: 'owner', roleName: ROLE_OWNER, addr: 'owner-addr' },
      { accountId: 'admin', roleName: ROLE_ADMIN, addr: 'admin-addr' },
      { accountId: 'viewer-off', roleName: ROLE_VIEWER, email: 'g@h.com' },
    ]);

    const result = getOrgAssignments(ROLE_OWNER, data);

    expect(result.offChainAssignments).toEqual([
      { email: 'g@h.com', roleName: ROLE_VIEWER },
    ]);
  });
});
