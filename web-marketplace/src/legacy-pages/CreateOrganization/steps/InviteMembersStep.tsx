import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Title, Body } from 'web-components/src/components/typography';
import { INVITE_MEMBERS } from '../CreateOrganization.constants';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { OrganizationMembersInviteTable } from 'components/organisms/OrganizationMembers/InviteMembers/InviteMembers.Table';
import { useAuth } from 'lib/auth/auth';
import { useMemo } from 'react';
import { DEFAULT_NAME } from 'pages/Dashboard/Dashboard.constants';
import { Member } from 'components/organisms/OrganizationMembers/OrganizationMembers.types';

const InviteMembersStep = () => {
  const { _ } = useLingui();
  const { activeAccount } = useAuth();

  const members = useMemo(() => {
    const dao =
      activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes?.find(
        dao => !!dao?.organizationByDaoAddress,
      );
    return (dao?.assignmentsByDaoAddress?.nodes?.map(assignment => {
      const acc = assignment?.accountByAccountId;
      return assignment
        ? {
            id: acc?.id,
            name: acc?.name || _(DEFAULT_NAME),
            title: acc?.title,
            avatar: acc?.image,
            role: assignment?.roleName,
            visible: assignment?.visible,
            hasWalletAddress: !!acc?.addr,
            isCurrentUser: acc?.id === activeAccount?.id,
            organization:
              dao?.organizationByDaoAddress?.name || _(DEFAULT_NAME),
            email:
              acc?.privateAccountById?.email ||
              acc?.privateAccountById?.googleEmail,
          }
        : null;
    }) ?? []) as Member[];
  }, [activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes]);

  return (
    <div className="text-center">
      <Title variant="h3">{_(INVITE_MEMBERS)}</Title>
      <Body className="pt-20 pb-40">
        <Trans>
          Organization members have permissions for all projects associated with
          an organization. You can also skip this step and invite members later.
        </Trans>
      </Body>
      {members && (
        <OrganizationMembersInviteTable
          members={members}
          onInvite={function (): void {
            throw new Error('Function not implemented.');
          }}
          onToggleSort={function (): void {
            throw new Error('Function not implemented.');
          }}
          onUpdateRole={function (id: string, role: BaseMemberRole): void {
            throw new Error('Function not implemented.');
          }}
          onUpdateVisibility={function (id: string, visible: boolean): void {
            throw new Error('Function not implemented.');
          }}
          onRemove={function (id: string): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}
    </div>
  );
};
export default InviteMembersStep;
