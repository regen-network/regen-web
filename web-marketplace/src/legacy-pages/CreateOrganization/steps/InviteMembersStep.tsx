import { useMemo, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';

import { Body } from 'web-components/src/components/typography';

import { AccountsOrderBy } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';

import {
  BaseMemberRole,
  Member,
} from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { useInviteMember } from 'components/organisms/BaseMembersTable/modals/hooks/useInviteMember';
import { OrganizationMembersInviteTable } from 'components/organisms/OrganizationMembers/InviteMembers/InviteMembers.Table';
import { useUpdateMembers } from 'hooks/org-members';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import { getAccountAssignment } from 'utils/rbam.utils';

export const InviteMembersStep = () => {
  const { _ } = useLingui();
  const [daoAccountsOrderBy, setDaoAccountsOrderBy] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);
  const { activeAccountId } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const daoOrganization = useDaoOrganization();

  const { data } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoOrganization?.address,
      address: daoOrganization?.address as string,
      daoAccountsOrderBy,
    }),
  );

  const dao = data?.daoByAddress;

  const currentUserRole = useMemo(
    () =>
      getAccountAssignment({
        accountId: activeAccountId,
        assignments: dao?.assignmentsByDaoAddress?.nodes,
      })?.roleName,
    [dao, activeAccountId],
  ) as BaseMemberRole | undefined;

  const members = useMemo(
    () =>
      (
        dao?.accountsByAssignmentDaoAddressAndAccountId?.nodes?.map(acc => {
          const assignment = getAccountAssignment({
            accountId: acc?.id,
            assignments: dao?.assignmentsByDaoAddress?.nodes,
          });
          return assignment
            ? {
                id: acc?.id,
                name: acc?.name || _(DEFAULT_NAME),
                title: acc?.title,
                avatar: acc?.image || DEFAULT_PROFILE_USER_AVATAR,
                role: assignment?.roleName,
                visible: assignment?.visible,
                address: acc?.addr,
                hasWalletAddress: !!acc?.addr,
                isCurrentUser: acc?.id === activeAccountId,
                organization:
                  daoOrganization?.organizationByDaoAddress?.name ||
                  _(DEFAULT_NAME),
                email:
                  acc?.privateAccountById?.email ||
                  acc?.privateAccountById?.googleEmail,
                onChainRoleId: parseInt(assignment?.onChainRoleId),
              }
            : null;
        }) ?? []
      ).filter(Boolean) as Member[],
    [dao, activeAccountId, _, daoOrganization],
  );

  const { addMember, removeMember, updateRole, updateVisibility } =
    useUpdateMembers({
      currentUserRole,
      daoAddress: dao?.address,
      daoRbamAddress: dao?.daoRbamAddress,
      cw4GroupAddress: dao?.cw4GroupAddress,
      members,
      daoAccountsOrderBy,
    });

  const { setDebouncedValue, accounts, daoData, saveProfile, onUpload } =
    useInviteMember();

  return (
    <div className="text-center">
      <Body className="pb-40">
        <Trans>
          Organization members have permissions for all projects associated with
          an organization. You can also skip this step and invite members later.
        </Trans>
      </Body>
      {members && (
        <OrganizationMembersInviteTable
          members={members}
          onToggleSort={() =>
            setDaoAccountsOrderBy(prev =>
              prev === AccountsOrderBy.NameAsc
                ? AccountsOrderBy.NameDesc
                : AccountsOrderBy.NameAsc,
            )
          }
          onUpdateRole={updateRole}
          onUpdateVisibility={updateVisibility}
          onRemove={removeMember}
          setDebouncedValue={setDebouncedValue}
          accounts={accounts}
          onAddMember={addMember}
          onSaveProfile={saveProfile}
          onUpload={onUpload}
          sortDir={daoAccountsOrderBy}
          daoWithAddress={daoData?.daoByAddress}
        />
      )}
    </div>
  );
};
